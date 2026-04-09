import { Type } from "@sinclair/typebox";
import { named } from "spac";

// ── Google Organic Results ───────────────────────────────────────────

export const GoogleSitelink = named(
  "GoogleSitelink",
  Type.Object({
    title: Type.String(),
    link: Type.String({ format: "uri" }),
    snippet: Type.Optional(Type.String()),
  }),
);

export const GoogleRichSnippetExtensions = named(
  "GoogleRichSnippetExtensions",
  Type.Object({
    extensions: Type.Optional(Type.Array(Type.String())),
    detected_extensions: Type.Optional(
      Type.Object(
        {
          rating: Type.Optional(Type.Number()),
          reviews: Type.Optional(Type.Integer()),
          reviews_link: Type.Optional(Type.String({ format: "uri" })),
          price: Type.Optional(Type.String()),
          currency: Type.Optional(Type.String()),
          address: Type.Optional(Type.String()),
        },
        { additionalProperties: true },
      ),
    ),
  }),
);

export const GoogleAboutThisResult = named(
  "GoogleAboutThisResult",
  Type.Object({
    source: Type.Optional(
      Type.Object({
        description: Type.Optional(Type.String()),
        source_info_link: Type.Optional(Type.String({ format: "uri" })),
        security: Type.Optional(Type.String()),
        icon: Type.Optional(Type.String({ format: "uri" })),
      }),
    ),
    keywords: Type.Optional(Type.Array(Type.String())),
    languages: Type.Optional(Type.Array(Type.String())),
    regions: Type.Optional(Type.Array(Type.String())),
  }),
);

export const GoogleOrganicResult = named(
  "GoogleOrganicResult",
  Type.Object({
    position: Type.Integer({ description: "Position of the result on the page" }),
    title: Type.String({ description: "Title of the organic result" }),
    link: Type.String({ description: "Direct URL to the result", format: "uri" }),
    redirect_link: Type.Optional(Type.String({ description: "Google redirect wrapper URL", format: "uri" })),
    displayed_link: Type.Optional(Type.String({ description: "Formatted URL shown to users" })),
    favicon: Type.Optional(Type.String({ description: "Favicon URL", format: "uri" })),
    source: Type.Optional(Type.String({ description: "Domain or source name" })),
    snippet: Type.Optional(Type.String({ description: "Preview text excerpt" })),
    snippet_highlighted_words: Type.Optional(Type.Array(Type.String())),
    date: Type.Optional(Type.String({ description: "Publication date" })),
    author: Type.Optional(Type.String()),
    thumbnail: Type.Optional(Type.String({ format: "uri" })),
    amp_link: Type.Optional(Type.String({ description: "AMP link (mobile results)", format: "uri" })),
    duration: Type.Optional(Type.String({ description: "Video duration if applicable" })),
    video_link: Type.Optional(Type.String({ format: "uri" })),
    cited_by: Type.Optional(Type.String()),
    extracted_cited_by: Type.Optional(Type.Integer()),
    sitelinks: Type.Optional(
      Type.Object({
        search_box: Type.Optional(Type.Boolean()),
        inline: Type.Optional(Type.Array(GoogleSitelink)),
        expanded: Type.Optional(Type.Array(GoogleSitelink)),
        list: Type.Optional(Type.Array(GoogleSitelink)),
      }),
    ),
    rich_snippet: Type.Optional(
      Type.Object({
        top: Type.Optional(GoogleRichSnippetExtensions),
        bottom: Type.Optional(GoogleRichSnippetExtensions),
      }),
    ),
    about_this_result: Type.Optional(GoogleAboutThisResult),
    about_page_link: Type.Optional(Type.String({ format: "uri" })),
    cached_page_link: Type.Optional(Type.String({ format: "uri" })),
    related_pages_link: Type.Optional(Type.String({ format: "uri" })),
  }),
);

// ── Knowledge Graph ──────────────────────────────────────────────────

export const GoogleKnowledgeGraph = named(
  "GoogleKnowledgeGraph",
  Type.Object(
    {
      title: Type.Optional(Type.String()),
      type: Type.Optional(Type.String({ description: "Entity classification" })),
      kgmid: Type.Optional(Type.String({ description: "Knowledge Graph Machine ID" })),
      description: Type.Optional(Type.String()),
      header_images: Type.Optional(
        Type.Array(
          Type.Object({ image: Type.Optional(Type.String({ format: "uri" })) }, { additionalProperties: true }),
        ),
      ),
      source: Type.Optional(
        Type.Object({ name: Type.Optional(Type.String()), link: Type.Optional(Type.String({ format: "uri" })) }),
      ),
    },
    { additionalProperties: true, description: "Knowledge Graph panel data — fields vary by entity type" },
  ),
);

// ── Related Questions (People Also Ask) ──────────────────────────────

export const GoogleRelatedQuestion = named(
  "GoogleRelatedQuestion",
  Type.Object({
    question: Type.String(),
    snippet: Type.Optional(Type.String()),
    title: Type.Optional(Type.String()),
    link: Type.Optional(Type.String({ format: "uri" })),
    displayed_link: Type.Optional(Type.String()),
  }),
);

// ── News Results ─────────────────────────────────────────────────────

export const GoogleNewsResult = named(
  "GoogleNewsResult",
  Type.Object({
    position: Type.Integer(),
    title: Type.String(),
    link: Type.String({ format: "uri" }),
    date: Type.Optional(Type.String({ description: "Relative publication date (e.g., '3 hours ago')" })),
    published_at: Type.Optional(Type.String({ description: "Publication date in UTC format" })),
    source: Type.String({ description: "Publication name" }),
    snippet: Type.Optional(Type.String()),
    favicon: Type.Optional(Type.String({ format: "uri" })),
    thumbnail: Type.Optional(Type.String({ format: "uri" })),
  }),
);

// ── Image Results ────────────────────────────────────────────────────

export const GoogleImageResult = named(
  "GoogleImageResult",
  Type.Object({
    position: Type.Integer(),
    thumbnail: Type.String({ format: "uri" }),
    original: Type.String({ description: "Original full-size image URL", format: "uri" }),
    original_width: Type.Optional(Type.Integer()),
    original_height: Type.Optional(Type.Integer()),
    title: Type.String(),
    link: Type.String({ format: "uri" }),
    source: Type.String(),
    source_logo: Type.Optional(Type.String({ format: "uri" })),
    tag: Type.Optional(Type.String()),
    is_product: Type.Optional(Type.Boolean()),
    in_stock: Type.Optional(Type.Boolean()),
  }),
);

// ── Shopping Results ─────────────────────────────────────────────────

export const GoogleShoppingResult = named(
  "GoogleShoppingResult",
  Type.Object({
    position: Type.Integer(),
    title: Type.String(),
    link: Type.Optional(Type.String({ format: "uri" })),
    product_link: Type.Optional(Type.String({ format: "uri" })),
    product_id: Type.Optional(Type.String()),
    source: Type.Optional(Type.String()),
    source_icon: Type.Optional(Type.String({ format: "uri" })),
    price: Type.Optional(Type.String()),
    extracted_price: Type.Optional(Type.Number()),
    old_price: Type.Optional(Type.String()),
    extracted_old_price: Type.Optional(Type.Number()),
    rating: Type.Optional(Type.Number()),
    reviews: Type.Optional(Type.Integer()),
    snippet: Type.Optional(Type.String()),
    extensions: Type.Optional(Type.Array(Type.String())),
    tag: Type.Optional(Type.String()),
    badge: Type.Optional(Type.String()),
    delivery: Type.Optional(Type.String()),
    thumbnail: Type.Optional(Type.String({ format: "uri" })),
  }),
);

// ── Local / Map Results ──────────────────────────────────────────────

export const GoogleLocalResult = named(
  "GoogleLocalResult",
  Type.Object({
    position: Type.Integer(),
    title: Type.String(),
    place_id: Type.Optional(Type.String()),
    data_id: Type.Optional(Type.String()),
    data_cid: Type.Optional(Type.String()),
    gps_coordinates: Type.Optional(
      Type.Object({
        latitude: Type.Number(),
        longitude: Type.Number(),
      }),
    ),
    rating: Type.Optional(Type.Number()),
    reviews: Type.Optional(Type.Integer()),
    price: Type.Optional(Type.String()),
    type: Type.Optional(Type.String()),
    types: Type.Optional(Type.Array(Type.String())),
    address: Type.Optional(Type.String()),
    open_state: Type.Optional(Type.String()),
    hours: Type.Optional(Type.String()),
    operating_hours: Type.Optional(Type.Record(Type.String(), Type.String())),
    phone: Type.Optional(Type.String()),
    website: Type.Optional(Type.String({ format: "uri" })),
    description: Type.Optional(Type.String()),
    thumbnail: Type.Optional(Type.String({ format: "uri" })),
    service_options: Type.Optional(
      Type.Object({
        dine_in: Type.Optional(Type.Boolean()),
        takeout: Type.Optional(Type.Boolean()),
        delivery: Type.Optional(Type.Boolean()),
        no_contact_delivery: Type.Optional(Type.Boolean()),
        curbside_pickup: Type.Optional(Type.Boolean()),
      }),
    ),
  }),
);

// ── Pagination ───────────────────────────────────────────────────────

export const SerpApiPagination = named(
  "SerpApiPagination",
  Type.Object({
    current: Type.Optional(Type.Integer()),
    next: Type.Optional(Type.String({ format: "uri" })),
    other_pages: Type.Optional(Type.Record(Type.String(), Type.String())),
  }),
);

// ── Composite response for Google Search ─────────────────────────────

export const GoogleSearchResponse = named(
  "GoogleSearchResponse",
  Type.Object(
    {
      search_metadata: Type.Optional(
        Type.Object({
          id: Type.String(),
          status: Type.String(),
          json_endpoint: Type.Optional(Type.String({ format: "uri" })),
          created_at: Type.Optional(Type.String()),
          processed_at: Type.Optional(Type.String()),
          google_url: Type.Optional(Type.String({ format: "uri" })),
          raw_html_file: Type.Optional(Type.String({ format: "uri" })),
          total_time_taken: Type.Optional(Type.Number()),
        }),
      ),
      search_parameters: Type.Optional(
        Type.Object(
          {
            engine: Type.Optional(Type.String()),
            q: Type.Optional(Type.String()),
            google_domain: Type.Optional(Type.String()),
            hl: Type.Optional(Type.String()),
            gl: Type.Optional(Type.String()),
            device: Type.Optional(Type.String()),
          },
          { additionalProperties: true },
        ),
      ),
      search_information: Type.Optional(
        Type.Object({
          organic_results_state: Type.Optional(Type.String()),
          query_displayed: Type.Optional(Type.String()),
          total_results: Type.Optional(Type.Integer()),
          time_taken_displayed: Type.Optional(Type.Number()),
          page_number: Type.Optional(Type.Integer()),
        }),
      ),
      organic_results: Type.Optional(Type.Array(GoogleOrganicResult)),
      knowledge_graph: Type.Optional(GoogleKnowledgeGraph),
      related_questions: Type.Optional(Type.Array(GoogleRelatedQuestion)),
      news_results: Type.Optional(Type.Array(GoogleNewsResult)),
      shopping_results: Type.Optional(Type.Array(GoogleShoppingResult)),
      local_results: Type.Optional(Type.Array(GoogleLocalResult)),
      related_searches: Type.Optional(
        Type.Array(
          Type.Object({
            query: Type.String(),
            link: Type.Optional(Type.String({ format: "uri" })),
          }),
        ),
      ),
      pagination: Type.Optional(SerpApiPagination),
    },
    {
      additionalProperties: true,
      description: "Response fields vary by query — not all sections appear in every response",
    },
  ),
);

// ── Google Maps response ─────────────────────────────────────────────

export const GoogleMapsResponse = named(
  "GoogleMapsResponse",
  Type.Object(
    {
      search_metadata: Type.Optional(
        Type.Object(
          {
            id: Type.String(),
            status: Type.String(),
            google_maps_url: Type.Optional(Type.String({ format: "uri" })),
          },
          { additionalProperties: true },
        ),
      ),
      search_information: Type.Optional(
        Type.Object({
          local_results_state: Type.Optional(Type.String()),
          query_displayed: Type.Optional(Type.String()),
        }),
      ),
      local_results: Type.Optional(Type.Array(GoogleLocalResult)),
      serpapi_pagination: Type.Optional(Type.Object({ next: Type.Optional(Type.String({ format: "uri" })) })),
    },
    { additionalProperties: true },
  ),
);

// ── Google Images response ───────────────────────────────────────────

export const GoogleImagesResponse = named(
  "GoogleImagesResponse",
  Type.Object(
    {
      search_metadata: Type.Optional(
        Type.Object({ id: Type.String(), status: Type.String() }, { additionalProperties: true }),
      ),
      images_results: Type.Optional(Type.Array(GoogleImageResult)),
      suggested_searches: Type.Optional(
        Type.Array(
          Type.Object({
            name: Type.String(),
            link: Type.Optional(Type.String({ format: "uri" })),
            thumbnail: Type.Optional(Type.String({ format: "uri" })),
          }),
        ),
      ),
    },
    { additionalProperties: true },
  ),
);

// ── Google News response ─────────────────────────────────────────────

export const GoogleNewsResponse = named(
  "GoogleNewsResponse",
  Type.Object(
    {
      search_metadata: Type.Optional(
        Type.Object({ id: Type.String(), status: Type.String() }, { additionalProperties: true }),
      ),
      news_results: Type.Optional(Type.Array(GoogleNewsResult)),
    },
    { additionalProperties: true },
  ),
);

// ── Google Shopping response ─────────────────────────────────────────

export const GoogleShoppingResponse = named(
  "GoogleShoppingResponse",
  Type.Object(
    {
      search_metadata: Type.Optional(
        Type.Object({ id: Type.String(), status: Type.String() }, { additionalProperties: true }),
      ),
      shopping_results: Type.Optional(Type.Array(GoogleShoppingResult)),
    },
    { additionalProperties: true },
  ),
);

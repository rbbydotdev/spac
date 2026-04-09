import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const SnippetsSnippetname = named(
  "snippets_SnippetName",
  Type.String({ description: "The identifying name of the snippet.", title: "Snippet Name", "x-auditable": true }),
)

export const SnippetsSnippetrules = named(
  "snippets_SnippetRules",
  Type.Array(
    Type.Object(
      {
        description: Type.Optional(
          Type.String({
            description: "An informative description of the rule.",
            default: "",
            title: "Description",
            "x-auditable": true,
          }),
        ),
        enabled: Type.Optional(
          Type.Boolean({
            description: "Whether the rule should be executed.",
            default: false,
            title: "Enabled",
            "x-auditable": true,
          }),
        ),
        expression: Type.String({
          description: "The expression defining which traffic will match the rule.",
          minLength: 1,
          title: "Expression",
          "x-auditable": true,
        }),
        id: Type.String({
          description: "The unique ID of the rule.",
          readOnly: true,
          title: "ID",
          "x-auditable": true,
        }),
        last_updated: Type.String({
          description: "The timestamp of when the rule was last modified.",
          format: "date-time",
          readOnly: true,
          title: "Last Updated",
          "x-auditable": true,
        }),
        snippet_name: SnippetsSnippetname,
      },
      { description: "A snippet rule." },
    ),
    { description: "A list of snippet rules.", title: "Snippet Rules" },
  ),
)

export const SnippetsPerpage = named(
  "snippets_PerPage",
  Type.Integer({
    description: "The number of results to return per page.",
    default: 25,
    minimum: 1,
    title: "Per Page",
    "x-auditable": true,
  }),
)

export const SnippetsPage = named(
  "snippets_Page",
  Type.Integer({ description: "The current page number.", default: 1, minimum: 1, title: "Page", "x-auditable": true }),
)

export const SnippetsZoneid = named(
  "snippets_ZoneId",
  Type.String({ description: "The unique ID of the zone.", title: "Zone ID", "x-auditable": true }),
)

export const SnippetsMessage = named(
  "snippets_Message",
  Type.Object(
    {
      code: Type.Optional(
        Type.Integer({ description: "A unique code for this message.", title: "Code", "x-auditable": true }),
      ),
      message: Type.String({
        description: "A text description of this message.",
        minLength: 1,
        title: "Description",
        "x-auditable": true,
      }),
    },
    { description: "A message." },
  ),
)

export const SnippetsErrors = named(
  "snippets_Errors",
  Type.Array(SnippetsMessage, { description: "A list of error messages.", title: "Errors" }),
)

export const SnippetsResultinfo = named(
  "snippets_ResultInfo",
  Type.Object(
    {
      count: Type.Integer({
        description: "The number of results in the current page.",
        minimum: 0,
        title: "Count",
        "x-auditable": true,
      }),
      page: SnippetsPage,
      per_page: SnippetsPerpage,
      total_count: Type.Integer({
        description: "The total number of results.",
        minimum: 0,
        title: "Total Count",
        "x-auditable": true,
      }),
      total_pages: Type.Integer({
        description: "The total number of pages.",
        minimum: 1,
        title: "Total Pages",
        "x-auditable": true,
      }),
    },
    { description: "Additional information to navigate the results." },
  ),
)

export const SnippetsSnippet = named(
  "snippets_Snippet",
  Type.Object(
    {
      created_on: Type.String({
        description: "The timestamp of when the snippet was created.",
        format: "date-time",
        readOnly: true,
        title: "Created On",
        "x-auditable": true,
      }),
      modified_on: Type.Optional(
        Type.String({
          description: "The timestamp of when the snippet was last modified.",
          format: "date-time",
          readOnly: true,
          title: "Modified On",
          "x-auditable": true,
        }),
      ),
      snippet_name: SnippetsSnippetname,
    },
    { description: "A snippet object." },
  ),
)

export const SnippetsMessages = named(
  "snippets_Messages",
  Type.Array(SnippetsMessage, { description: "A list of warning messages.", title: "Messages" }),
)

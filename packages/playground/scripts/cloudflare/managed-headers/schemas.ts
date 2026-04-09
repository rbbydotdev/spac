import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const RulesetsManagedtransformid = named(
  "rulesets_ManagedTransformId",
  Type.String({
    description: "The human-readable identifier of the Managed Transform.",
    minLength: 1,
    title: "Transform ID",
  }),
)

export const RulesetsManagedtransforms = named(
  "rulesets_ManagedTransforms",
  Type.Object(
    {
      managed_request_headers: Type.Array(
        Type.Object(
          {
            conflicts_with: Type.Optional(
              Type.Array(Type.Intersect([RulesetsManagedtransformid, Type.String()]), {
                description: "The Managed Transforms that this Managed Transform conflicts with.",
                minItems: 1,
                uniqueItems: true,
                readOnly: true,
                title: "Conflicts With",
                "x-stainless-skip": ["terraform"],
              }),
            ),
            enabled: Type.Boolean({ description: "Whether the Managed Transform is enabled.", title: "Enabled" }),
            has_conflict: Type.Boolean({
              description: "Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.",
              readOnly: true,
              title: "Has Conflict",
              "x-stainless-skip": ["terraform"],
            }),
            id: RulesetsManagedtransformid,
          },
          { description: "A Managed Transform object." },
        ),
        {
          description: "The list of Managed Request Transforms.",
          uniqueItems: true,
          title: "Managed Request Transforms",
        },
      ),
      managed_response_headers: Type.Array(
        Type.Object(
          {
            conflicts_with: Type.Optional(
              Type.Array(Type.Intersect([RulesetsManagedtransformid, Type.String()]), {
                description: "The Managed Transforms that this Managed Transform conflicts with.",
                minItems: 1,
                uniqueItems: true,
                readOnly: true,
                title: "Conflicts With",
                "x-stainless-skip": ["terraform"],
              }),
            ),
            enabled: Type.Boolean({ description: "Whether the Managed Transform is enabled.", title: "Enabled" }),
            has_conflict: Type.Boolean({
              description: "Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.",
              readOnly: true,
              title: "Has Conflict",
              "x-stainless-skip": ["terraform"],
            }),
            id: RulesetsManagedtransformid,
          },
          { description: "A Managed Transform object." },
        ),
        {
          description: "The list of Managed Response Transforms.",
          uniqueItems: true,
          title: "Managed Response Transforms",
        },
      ),
    },
    { description: "A Managed Transforms object." },
  ),
)

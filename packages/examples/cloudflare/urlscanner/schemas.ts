import { Type } from "@sinclair/typebox"
import { named } from "spac"

export const UnnamedSchemaRef3750739f772bbdf0bb00d6634ccc0631 = named(
  "unnamed_schema_ref_3750739f772bbdf0bb00d6634ccc0631",
  Type.Object({
    effectiveUrl: Type.String(),
    errors: Type.Array(
      Type.Object({
        message: Type.String(),
      }),
    ),
    location: Type.String(),
    region: Type.String(),
    status: Type.String(),
    success: Type.Boolean(),
    time: Type.String(),
    url: Type.String(),
    uuid: Type.String(),
    visibility: Type.String(),
  }),
)

export const UnnamedSchemaRef6d7a78acccfc753a8e931b1c4e72b6a6 = named(
  "unnamed_schema_ref_6d7a78acccfc753a8e931b1c4e72b6a6",
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    super_category_id: Type.Optional(Type.Integer()),
  }),
)

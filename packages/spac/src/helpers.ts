import { Type, type TSchema } from '@sinclair/typebox'
import type { ResponseDef } from './types'

/**
 * Wrap a schema as an `application/json` body hint.
 * Currently a pass-through — provided for symmetry with future
 * `multipart()` / `formData()` helpers.
 *
 * @param schema - The TypeBox schema for the request body.
 * @returns The same schema, unchanged.
 *
 * @example
 * ```ts
 * api.post('/pets', { body: json(CreatePet), response: Pet })
 * // Equivalent to:
 * api.post('/pets', { body: CreatePet, response: Pet })
 * ```
 */
export function json(schema: TSchema): TSchema {
  return schema
}

/**
 * Create a no-body response definition, typically used for 204 responses.
 *
 * @param description - Response description. Defaults to `'No Content'`.
 * @returns A {@link ResponseDef} with no schema.
 *
 * @example
 * ```ts
 * api.delete('/pets/:petId', {
 *   params: Type.Object({ petId: Type.String() }),
 *   responses: { 204: noContent() },
 * })
 *
 * // Custom description
 * responses: { 204: noContent('Resource deleted') }
 * ```
 */
export function noContent(description = 'No Content'): ResponseDef {
  return { description }
}

/**
 * Create a response definition for 201 Created responses.
 *
 * @param schema - TypeBox schema for the created resource.
 * @param description - Response description. Defaults to `'Created'`.
 * @returns A {@link ResponseDef} with the given schema and description.
 *
 * @example
 * ```ts
 * api.post('/pets', {
 *   body: CreatePet,
 *   responses: { 201: created(Pet) },
 * })
 *
 * // Custom description
 * responses: { 201: created(Pet, 'Pet successfully created') }
 * ```
 */
export function created(schema: TSchema, description = 'Created'): ResponseDef {
  return { description, schema }
}

/**
 * Create a standard error object schema with `message` and optional `code` fields.
 * Additional fields can be merged in via the `fields` parameter.
 *
 * @param fields - Optional additional fields to merge into the error schema.
 * @returns A TypeBox object schema.
 *
 * @example
 * ```ts
 * // Basic error schema: { message: string, code?: string }
 * const Error = errorSchema()
 *
 * // Extended with validation details
 * const DetailedError = errorSchema({
 *   details: Type.Array(Type.Object({
 *     field: Type.String(),
 *     issue: Type.String(),
 *   })),
 * })
 *
 * api.get('/pets/:petId', { response: Pet }).error(404, Error)
 * ```
 */
export function errorSchema(fields?: Record<string, TSchema>) {
  return Type.Object({
    message: Type.String(),
    code: Type.Optional(Type.String()),
    ...fields,
  })
}

/**
 * Wrap an item schema into a paginated envelope with `items`, `total`, `page`,
 * and `pageSize` fields.
 *
 * @param itemSchema - TypeBox schema for individual items in the list.
 * @returns A TypeBox object schema representing the paginated response.
 *
 * @example
 * ```ts
 * api.get('/pets', {
 *   query: Type.Object({
 *     page: Type.Optional(Type.Integer({ default: 1 })),
 *     pageSize: Type.Optional(Type.Integer({ default: 20 })),
 *   }),
 *   response: paginated(Pet),
 * })
 * // Response shape: { items: Pet[], total: number, page: number, pageSize: number }
 * ```
 */
export function paginated(itemSchema: TSchema) {
  return Type.Object({
    items: Type.Array(itemSchema),
    total: Type.Integer(),
    page: Type.Integer(),
    pageSize: Type.Integer(),
  })
}

/**
 * Wrap a data schema in a `{ data }` envelope.
 *
 * @param dataSchema - TypeBox schema for the wrapped data.
 * @returns A TypeBox object schema with a single `data` property.
 *
 * @example
 * ```ts
 * api.get('/pets/:petId', {
 *   params: Type.Object({ petId: Type.String() }),
 *   response: envelope(Pet),
 * })
 * // Response shape: { data: Pet }
 * ```
 */
export function envelope(dataSchema: TSchema) {
  return Type.Object({
    data: dataSchema,
  })
}

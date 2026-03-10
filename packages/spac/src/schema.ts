import type { TSchema } from '@sinclair/typebox'

/** Symbol used to annotate a TypeBox schema with a component name. */
export const SCHEMA_NAME = Symbol.for('spac.schemaName')

/**
 * Annotate a TypeBox schema with a name so it gets hoisted into
 * `components.schemas` during emission and referenced via `$ref`.
 *
 * The original schema object is mutated and returned (not cloned).
 * Named schemas are automatically discovered during {@link emitOpenApi} when they
 * appear in route configs — you don't need to also call {@link Api.schema}.
 *
 * @param name - The schema name as it will appear in `components.schemas`.
 * @param schema - The TypeBox schema to annotate.
 * @returns The same schema, annotated with the name.
 *
 * @example
 * ```ts
 * const Pet = named('Pet', Type.Object({
 *   id: Type.Integer(),
 *   name: Type.String(),
 *   status: Type.Union([Type.Literal('available'), Type.Literal('sold')]),
 * }))
 *
 * // When used in a route, emits as $ref: '#/components/schemas/Pet'
 * api.get('/pets', { response: Type.Array(Pet) })
 * ```
 */
export function named<T extends TSchema>(name: string, schema: T): T {
  ;(schema as unknown as Record<symbol, unknown>)[SCHEMA_NAME] = name
  return schema
}

/**
 * Read the schema name annotation set by {@link named}, if any.
 *
 * @param schema - A TypeBox schema.
 * @returns The schema name, or `undefined` if the schema is not named.
 *
 * @example
 * ```ts
 * const Pet = named('Pet', Type.Object({ name: Type.String() }))
 * getSchemaName(Pet) // => 'Pet'
 *
 * const Anon = Type.String()
 * getSchemaName(Anon) // => undefined
 * ```
 */
export function getSchemaName(schema: TSchema): string | undefined {
  return (schema as unknown as Record<symbol, unknown>)[SCHEMA_NAME] as string | undefined
}

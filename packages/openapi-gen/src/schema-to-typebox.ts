import { toSafeKey } from './names'

// ---------------------------------------------------------------------------
// Context passed through schema conversion
// ---------------------------------------------------------------------------

export interface SchemaContext {
  /** $ref string → TypeScript variable name */
  refMap: Map<string, string>
  /** Track which schema vars are actually referenced */
  usedRefs: Set<string>
  /** Set to current schema's $ref during generation to detect self-references */
  selfRef?: string
  /** Flipped to true if a self-reference was encountered */
  hasSelfRef?: boolean
}

export function createContext(refMap: Map<string, string>): SchemaContext {
  return { refMap, usedRefs: new Set() }
}

// ---------------------------------------------------------------------------
// JSON Schema → TypeBox code string
// ---------------------------------------------------------------------------

/**
 * Convert a JSON Schema node to a TypeBox code string.
 * `ind` controls indentation level for multi-line output (objects).
 */
export function schemaToTypebox(schema: any, ctx: SchemaContext, ind: number = 0): string {
  if (schema === undefined || schema === null) return 'Type.Unknown()'
  if (typeof schema === 'boolean') return schema ? 'Type.Any()' : 'Type.Never()'

  // $ref → variable reference
  if (schema.$ref) {
    // Self-reference → emit `This` for Type.Recursive
    if (ctx.selfRef && schema.$ref === ctx.selfRef) {
      ctx.hasSelfRef = true
      return 'This'
    }
    const varName = ctx.refMap.get(schema.$ref)
    if (varName) {
      ctx.usedRefs.add(varName)
      return varName
    }
    return `Type.Unknown() /* unresolved: ${schema.$ref} */`
  }

  // Composition: allOf, oneOf, anyOf
  if (schema.allOf) {
    const items = schema.allOf.map((s: any) => schemaToTypebox(s, ctx, ind))
    const opts = buildOptsStr(schema, ['description'])
    return `Type.Intersect([${items.join(', ')}]${opts})`
  }
  if (schema.oneOf) {
    const items = schema.oneOf.map((s: any) => schemaToTypebox(s, ctx, ind))
    const opts = buildOptsStr(schema, ['description'])
    return `Type.Union([${items.join(', ')}]${opts})`
  }
  if (schema.anyOf) {
    const items = schema.anyOf.map((s: any) => schemaToTypebox(s, ctx, ind))
    const opts = buildOptsStr(schema, ['description'])
    return `Type.Union([${items.join(', ')}]${opts})`
  }

  // const → Literal (null is not a valid Literal value, use Type.Null())
  if (schema.const !== undefined) {
    if (schema.const === null) return 'Type.Null()'
    return `Type.Literal(${JSON.stringify(schema.const)})`
  }

  // enum → Union of Literals (null values become Type.Null())
  if (schema.enum) {
    const literals = schema.enum.map((v: any) =>
      v === null ? 'Type.Null()' : `Type.Literal(${JSON.stringify(v)})`
    )
    const opts = buildOptsStr(schema, ['description'])
    return `Type.Union([${literals.join(', ')}]${opts})`
  }

  // Handle nullable wrapper
  const nullable = schema.nullable === true
  const core = convertType(schema, ctx, ind)
  if (nullable && !core.includes('Type.Null')) {
    return `Type.Union([${core}, Type.Null()])`
  }
  return core
}

function convertType(schema: any, ctx: SchemaContext, ind: number): string {
  const type = schema.type

  // Array of types (JSON Schema draft 2020-12)
  if (Array.isArray(type)) {
    const types = type.filter((t: string) => t !== 'null')
    const hasNull = type.includes('null')
    if (types.length === 1) {
      const inner = convertSingleType(types[0], schema, ctx, ind)
      return hasNull ? `Type.Union([${inner}, Type.Null()])` : inner
    }
    const items = types.map((t: string) => convertSingleType(t, schema, ctx, ind))
    if (hasNull) items.push('Type.Null()')
    return `Type.Union([${items.join(', ')}])`
  }

  if (typeof type === 'string') {
    return convertSingleType(type, schema, ctx, ind)
  }

  // No type specified — check for object-like structure
  if (schema.properties || schema.additionalProperties) {
    return convertSingleType('object', schema, ctx, ind)
  }
  if (schema.items) {
    return convertSingleType('array', schema, ctx, ind)
  }

  // Truly unknown
  const opts = buildOptsStr(schema, ['description'])
  return `Type.Unknown(${opts ? opts.slice(2) : ''})`
}

function convertSingleType(type: string, schema: any, ctx: SchemaContext, ind: number): string {
  const pad = '  '.repeat(ind)
  const pad1 = '  '.repeat(ind + 1)

  switch (type) {
    case 'string': {
      const opts = buildOptsStr(schema, STRING_OPTS)
      return `Type.String(${stripLeadingComma(opts)})`
    }
    case 'number': {
      const opts = buildOptsStr(schema, NUMBER_OPTS)
      return `Type.Number(${stripLeadingComma(opts)})`
    }
    case 'integer': {
      const opts = buildOptsStr(schema, NUMBER_OPTS)
      return `Type.Integer(${stripLeadingComma(opts)})`
    }
    case 'boolean': {
      const opts = buildOptsStr(schema, BOOLEAN_OPTS)
      return `Type.Boolean(${stripLeadingComma(opts)})`
    }
    case 'null':
      return 'Type.Null()'

    case 'object': {
      if (!schema.properties && schema.additionalProperties) {
        // Record type: { additionalProperties: <schema> }
        const valSchema = schema.additionalProperties === true
          ? 'Type.Unknown()'
          : schemaToTypebox(schema.additionalProperties, ctx, ind)
        return `Type.Record(Type.String(), ${valSchema})`
      }
      if (!schema.properties) {
        const opts = buildOptsStr(schema, ['description'])
        return `Type.Unknown(${stripLeadingComma(opts)})`
      }

      const required = new Set<string>(schema.required || [])
      const entries = Object.entries(schema.properties)

      if (entries.length === 0) {
        return 'Type.Object({})'
      }

      const props = entries.map(([key, val]) => {
        const code = schemaToTypebox(val as any, ctx, ind + 1)
        const safe = toSafeKey(key)
        const prop = required.has(key) ? `${safe}: ${code}` : `${safe}: Type.Optional(${code})`
        return `${pad1}${prop},`
      })

      const objOpts = buildOptsStr(schema, ['description'])
      return `Type.Object({\n${props.join('\n')}\n${pad}}${objOpts})`
    }

    case 'array': {
      const items = schema.items
        ? schemaToTypebox(schema.items, ctx, ind)
        : 'Type.Unknown()'
      const opts = buildOptsStr(schema, ARRAY_OPTS)
      return `Type.Array(${items}${opts})`
    }

    default:
      return 'Type.Unknown()'
  }
}

// ---------------------------------------------------------------------------
// Options extraction
// ---------------------------------------------------------------------------

const STRING_OPTS = ['description', 'format', 'default', 'minLength', 'maxLength', 'pattern', 'readOnly', 'writeOnly', 'deprecated', 'title']
const NUMBER_OPTS = ['description', 'format', 'default', 'minimum', 'maximum', 'exclusiveMinimum', 'exclusiveMaximum', 'multipleOf', 'readOnly', 'writeOnly', 'deprecated', 'title']
const BOOLEAN_OPTS = ['description', 'default', 'readOnly', 'writeOnly', 'deprecated', 'title']
const ARRAY_OPTS = ['description', 'minItems', 'maxItems', 'uniqueItems', 'readOnly', 'writeOnly', 'deprecated', 'title']

/**
 * Build an options string like `, { description: "foo", maxLength: 100 }`.
 * Returns empty string if no relevant options.
 * The leading `, ` is included for easy appending to Type.X(schema, opts).
 */
function buildOptsStr(schema: any, keys: string[]): string {
  const opts: Record<string, any> = {}
  for (const key of keys) {
    if (schema[key] !== undefined) {
      opts[key] = schema[key]
    }
  }
  // Preserve x-* extensions
  for (const key of Object.keys(schema)) {
    if (key.startsWith('x-')) {
      opts[key] = schema[key]
    }
  }
  if (Object.keys(opts).length === 0) return ''
  return `, ${JSON.stringify(opts)}`
}

function stripLeadingComma(s: string): string {
  return s.startsWith(', ') ? s.slice(2) : s
}

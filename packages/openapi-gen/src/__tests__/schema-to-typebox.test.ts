import { describe, it, expect } from 'vitest'
import { schemaToTypebox, createContext } from '../schema-to-typebox'

function convert(schema: any, refMap = new Map<string, string>()) {
  const ctx = createContext(refMap)
  return schemaToTypebox(schema, ctx)
}

describe('schemaToTypebox', () => {
  describe('primitives', () => {
    it('converts string', () => {
      expect(convert({ type: 'string' })).toBe('Type.String()')
    })

    it('converts string with options', () => {
      expect(convert({ type: 'string', description: 'A name', maxLength: 100 }))
        .toBe('Type.String({"description":"A name","maxLength":100})')
    })

    it('converts string with format', () => {
      expect(convert({ type: 'string', format: 'email' }))
        .toBe('Type.String({"format":"email"})')
    })

    it('converts number', () => {
      expect(convert({ type: 'number' })).toBe('Type.Number()')
    })

    it('converts number with constraints', () => {
      expect(convert({ type: 'number', minimum: 1, maximum: 100 }))
        .toBe('Type.Number({"minimum":1,"maximum":100})')
    })

    it('converts integer', () => {
      expect(convert({ type: 'integer' })).toBe('Type.Integer()')
    })

    it('converts boolean', () => {
      expect(convert({ type: 'boolean' })).toBe('Type.Boolean()')
    })

    it('converts boolean with default', () => {
      expect(convert({ type: 'boolean', default: false }))
        .toBe('Type.Boolean({"default":false})')
    })

    it('converts null', () => {
      expect(convert({ type: 'null' })).toBe('Type.Null()')
    })
  })

  describe('enum', () => {
    it('converts string enum', () => {
      expect(convert({ enum: ['asc', 'desc'] }))
        .toBe('Type.Union([Type.Literal("asc"), Type.Literal("desc")])')
    })

    it('converts enum with description', () => {
      const result = convert({ enum: ['a', 'b'], description: 'Direction' })
      expect(result).toContain('Type.Union')
      expect(result).toContain('"description":"Direction"')
    })

    it('converts mixed enum', () => {
      const result = convert({ enum: ['foo', 42, true] })
      expect(result).toContain('Type.Literal("foo")')
      expect(result).toContain('Type.Literal(42)')
      expect(result).toContain('Type.Literal(true)')
    })
  })

  describe('const', () => {
    it('converts const string', () => {
      expect(convert({ const: 'active' })).toBe('Type.Literal("active")')
    })

    it('converts const number', () => {
      expect(convert({ const: 42 })).toBe('Type.Literal(42)')
    })
  })

  describe('object', () => {
    it('converts simple object', () => {
      const result = convert({
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
      })
      expect(result).toContain('Type.Object({')
      expect(result).toContain('name: Type.String()')
      expect(result).not.toContain('Type.Optional')
    })

    it('marks non-required props as optional', () => {
      const result = convert({
        type: 'object',
        properties: { name: { type: 'string' } },
      })
      expect(result).toContain('Type.Optional(Type.String())')
    })

    it('handles mixed required and optional', () => {
      const result = convert({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          age: { type: 'integer' },
        },
        required: ['id'],
      })
      expect(result).toContain('id: Type.String()')
      expect(result).toContain('name: Type.Optional(Type.String())')
      expect(result).toContain('age: Type.Optional(Type.Integer())')
    })

    it('handles empty properties', () => {
      expect(convert({ type: 'object', properties: {} })).toBe('Type.Object({})')
    })

    it('handles object without properties', () => {
      const result = convert({ type: 'object' })
      expect(result).toContain('Type.Unknown()')
    })

    it('handles additionalProperties as record', () => {
      const result = convert({
        type: 'object',
        additionalProperties: { type: 'string' },
      })
      expect(result).toBe('Type.Record(Type.String(), Type.String())')
    })

    it('handles additionalProperties: true', () => {
      const result = convert({
        type: 'object',
        additionalProperties: true,
      })
      expect(result).toBe('Type.Record(Type.String(), Type.Unknown())')
    })

    it('quotes unsafe property keys', () => {
      const result = convert({
        type: 'object',
        properties: { 'content-type': { type: 'string' } },
      })
      expect(result).toContain('"content-type"')
    })
  })

  describe('array', () => {
    it('converts array of strings', () => {
      expect(convert({ type: 'array', items: { type: 'string' } }))
        .toBe('Type.Array(Type.String())')
    })

    it('converts array with constraints', () => {
      const result = convert({ type: 'array', items: { type: 'number' }, minItems: 1 })
      expect(result).toContain('Type.Array(Type.Number()')
      expect(result).toContain('"minItems":1')
    })

    it('converts array without items', () => {
      expect(convert({ type: 'array' })).toBe('Type.Array(Type.Unknown())')
    })
  })

  describe('$ref', () => {
    it('resolves $ref to variable name', () => {
      const refMap = new Map([['#/components/schemas/Pet', 'Pet']])
      const ctx = createContext(refMap)
      const result = schemaToTypebox({ $ref: '#/components/schemas/Pet' }, ctx)
      expect(result).toBe('Pet')
      expect(ctx.usedRefs.has('Pet')).toBe(true)
    })

    it('handles unknown $ref gracefully', () => {
      const result = convert({ $ref: '#/components/schemas/Unknown' })
      expect(result).toContain('Type.Unknown()')
      expect(result).toContain('unresolved')
    })
  })

  describe('composition', () => {
    it('converts allOf to Intersect', () => {
      const result = convert({
        allOf: [{ type: 'object', properties: { a: { type: 'string' } } }, { type: 'object', properties: { b: { type: 'number' } } }],
      })
      expect(result).toContain('Type.Intersect([')
    })

    it('converts oneOf to Union', () => {
      const result = convert({
        oneOf: [{ type: 'string' }, { type: 'number' }],
      })
      expect(result).toBe('Type.Union([Type.String(), Type.Number()])')
    })

    it('converts anyOf to Union', () => {
      const result = convert({
        anyOf: [{ type: 'string' }, { type: 'boolean' }],
      })
      expect(result).toBe('Type.Union([Type.String(), Type.Boolean()])')
    })
  })

  describe('nullable', () => {
    it('wraps nullable string in Union with Null', () => {
      const result = convert({ type: 'string', nullable: true })
      expect(result).toBe('Type.Union([Type.String(), Type.Null()])')
    })

    it('handles nullable object', () => {
      const result = convert({
        type: 'object',
        nullable: true,
        properties: { id: { type: 'string' } },
        required: ['id'],
      })
      expect(result).toContain('Type.Union([Type.Object({')
      expect(result).toContain('Type.Null()])')
    })
  })

  describe('type arrays (JSON Schema 2020-12)', () => {
    it('converts ["string", "null"]', () => {
      const result = convert({ type: ['string', 'null'] })
      expect(result).toBe('Type.Union([Type.String(), Type.Null()])')
    })

    it('converts single type in array', () => {
      const result = convert({ type: ['integer'] })
      expect(result).toBe('Type.Integer()')
    })
  })

  describe('edge cases', () => {
    it('handles undefined', () => {
      expect(convert(undefined)).toBe('Type.Unknown()')
    })

    it('handles null', () => {
      expect(convert(null)).toBe('Type.Unknown()')
    })

    it('handles boolean schema true', () => {
      expect(convert(true)).toBe('Type.Any()')
    })

    it('handles boolean schema false', () => {
      expect(convert(false)).toBe('Type.Never()')
    })

    it('infers object from properties without type', () => {
      const result = convert({
        properties: { name: { type: 'string' } },
      })
      expect(result).toContain('Type.Object({')
    })

    it('infers array from items without type', () => {
      const result = convert({
        items: { type: 'string' },
      })
      expect(result).toBe('Type.Array(Type.String())')
    })
  })
})

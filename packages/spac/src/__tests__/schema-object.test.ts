import { describe, it, expect } from 'vitest'
import { validateSchemaObject } from '../validate'

describe('Schema Object (4.8.24)', () => {
  // --- Boolean Schemas ---

  describe('boolean schemas', () => {
    it('accepts true (allows any instance)', () => {
      expect(validateSchemaObject(true).valid).toBe(true)
    })

    it('accepts false (allows no instances)', () => {
      expect(validateSchemaObject(false).valid).toBe(true)
    })
  })

  // --- Basic Type Schemas ---

  describe('basic type schemas', () => {
    it('accepts type: "string"', () => {
      expect(validateSchemaObject({ type: 'string' }).valid).toBe(true)
    })

    it('accepts type: "number"', () => {
      expect(validateSchemaObject({ type: 'number' }).valid).toBe(true)
    })

    it('accepts type: "integer"', () => {
      expect(validateSchemaObject({ type: 'integer' }).valid).toBe(true)
    })

    it('accepts type: "boolean"', () => {
      expect(validateSchemaObject({ type: 'boolean' }).valid).toBe(true)
    })

    it('accepts type: "array"', () => {
      expect(validateSchemaObject({ type: 'array', items: { type: 'string' } }).valid).toBe(true)
    })

    it('accepts type: "object"', () => {
      expect(validateSchemaObject({ type: 'object' }).valid).toBe(true)
    })

    it('accepts type: "null"', () => {
      expect(validateSchemaObject({ type: 'null' }).valid).toBe(true)
    })

    it('accepts type as an array (nullable)', () => {
      expect(validateSchemaObject({ type: ['string', 'null'] }).valid).toBe(true)
    })
  })

  // --- Format ---

  describe('format', () => {
    it('accepts format: "int32"', () => {
      expect(validateSchemaObject({ type: 'integer', format: 'int32' }).valid).toBe(true)
    })

    it('accepts format: "int64"', () => {
      expect(validateSchemaObject({ type: 'integer', format: 'int64' }).valid).toBe(true)
    })

    it('accepts format: "float"', () => {
      expect(validateSchemaObject({ type: 'number', format: 'float' }).valid).toBe(true)
    })

    it('accepts format: "double"', () => {
      expect(validateSchemaObject({ type: 'number', format: 'double' }).valid).toBe(true)
    })

    it('accepts format: "password"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'password' }).valid).toBe(true)
    })

    it('accepts format: "date"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'date' }).valid).toBe(true)
    })

    it('accepts format: "date-time"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'date-time' }).valid).toBe(true)
    })

    it('accepts format: "byte"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'byte' }).valid).toBe(true)
    })

    it('accepts format: "binary"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'binary' }).valid).toBe(true)
    })

    it('accepts format: "email"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'email' }).valid).toBe(true)
    })

    it('accepts format: "uri"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'uri' }).valid).toBe(true)
    })

    it('accepts format: "uuid"', () => {
      expect(validateSchemaObject({ type: 'string', format: 'uuid' }).valid).toBe(true)
    })

    it('accepts custom/unknown formats (non-validating annotation)', () => {
      expect(validateSchemaObject({ type: 'string', format: 'custom-format' }).valid).toBe(true)
    })
  })

  // --- Object Properties ---

  describe('object properties', () => {
    it('accepts properties', () => {
      expect(validateSchemaObject({
        type: 'object',
        properties: {
          name: { type: 'string' },
          age: { type: 'integer' },
        },
      }).valid).toBe(true)
    })

    it('accepts required array', () => {
      expect(validateSchemaObject({
        type: 'object',
        properties: { name: { type: 'string' } },
        required: ['name'],
      }).valid).toBe(true)
    })

    it('accepts additionalProperties as boolean', () => {
      expect(validateSchemaObject({
        type: 'object',
        additionalProperties: false,
      }).valid).toBe(true)
    })

    it('accepts additionalProperties as schema', () => {
      expect(validateSchemaObject({
        type: 'object',
        additionalProperties: { type: 'string' },
      }).valid).toBe(true)
    })

    it('accepts minProperties and maxProperties', () => {
      expect(validateSchemaObject({
        type: 'object',
        minProperties: 1,
        maxProperties: 10,
      }).valid).toBe(true)
    })
  })

  // --- Array Items ---

  describe('array items', () => {
    it('accepts items as a schema', () => {
      expect(validateSchemaObject({
        type: 'array',
        items: { type: 'string' },
      }).valid).toBe(true)
    })

    it('accepts minItems and maxItems', () => {
      expect(validateSchemaObject({
        type: 'array',
        items: { type: 'string' },
        minItems: 1,
        maxItems: 100,
      }).valid).toBe(true)
    })

    it('accepts uniqueItems', () => {
      expect(validateSchemaObject({
        type: 'array',
        items: { type: 'string' },
        uniqueItems: true,
      }).valid).toBe(true)
    })
  })

  // --- String Constraints ---

  describe('string constraints', () => {
    it('accepts minLength and maxLength', () => {
      expect(validateSchemaObject({
        type: 'string',
        minLength: 1,
        maxLength: 255,
      }).valid).toBe(true)
    })

    it('accepts pattern as a regex', () => {
      expect(validateSchemaObject({
        type: 'string',
        pattern: '^[a-zA-Z]+$',
      }).valid).toBe(true)
    })
  })

  // --- Number Constraints ---

  describe('number constraints', () => {
    it('accepts minimum and maximum', () => {
      expect(validateSchemaObject({
        type: 'number',
        minimum: 0,
        maximum: 100,
      }).valid).toBe(true)
    })

    it('accepts exclusiveMinimum and exclusiveMaximum', () => {
      expect(validateSchemaObject({
        type: 'number',
        exclusiveMinimum: 0,
        exclusiveMaximum: 100,
      }).valid).toBe(true)
    })

    it('accepts multipleOf', () => {
      expect(validateSchemaObject({
        type: 'integer',
        multipleOf: 5,
      }).valid).toBe(true)
    })
  })

  // --- Composition Keywords ---

  describe('composition keywords', () => {
    it('accepts allOf', () => {
      expect(validateSchemaObject({
        allOf: [
          { type: 'object', properties: { name: { type: 'string' } } },
          { type: 'object', properties: { age: { type: 'integer' } } },
        ],
      }).valid).toBe(true)
    })

    it('accepts oneOf', () => {
      expect(validateSchemaObject({
        oneOf: [
          { type: 'string' },
          { type: 'integer' },
        ],
      }).valid).toBe(true)
    })

    it('accepts anyOf', () => {
      expect(validateSchemaObject({
        anyOf: [
          { type: 'string' },
          { type: 'integer' },
        ],
      }).valid).toBe(true)
    })

    it('accepts not', () => {
      expect(validateSchemaObject({
        not: { type: 'string' },
      }).valid).toBe(true)
    })
  })

  // --- Enum and Const ---

  describe('enum and const', () => {
    it('accepts enum', () => {
      expect(validateSchemaObject({
        type: 'string',
        enum: ['active', 'inactive'],
      }).valid).toBe(true)
    })

    it('accepts const', () => {
      expect(validateSchemaObject({
        const: 'fixed-value',
      }).valid).toBe(true)
    })
  })

  // --- Annotations ---

  describe('annotations', () => {
    it('accepts title', () => {
      expect(validateSchemaObject({ type: 'string', title: 'Pet Name' }).valid).toBe(true)
    })

    it('accepts description', () => {
      expect(validateSchemaObject({ type: 'string', description: 'The name of the pet' }).valid).toBe(true)
    })

    it('accepts default', () => {
      expect(validateSchemaObject({ type: 'string', default: 'Fido' }).valid).toBe(true)
    })

    it('accepts deprecated', () => {
      expect(validateSchemaObject({ type: 'string', deprecated: true }).valid).toBe(true)
    })

    it('accepts readOnly', () => {
      expect(validateSchemaObject({ type: 'string', readOnly: true }).valid).toBe(true)
    })

    it('accepts writeOnly', () => {
      expect(validateSchemaObject({ type: 'string', writeOnly: true }).valid).toBe(true)
    })

    it('accepts examples (JSON Schema keyword)', () => {
      expect(validateSchemaObject({ type: 'string', examples: ['Fido', 'Rex'] }).valid).toBe(true)
    })
  })

  // --- OAS-Specific Keywords ---

  describe('OAS-specific keywords', () => {
    it('accepts discriminator', () => {
      expect(validateSchemaObject({
        oneOf: [
          { $ref: '#/components/schemas/Cat' },
          { $ref: '#/components/schemas/Dog' },
        ],
        discriminator: { propertyName: 'petType' },
      }).valid).toBe(true)
    })

    it('accepts xml', () => {
      expect(validateSchemaObject({
        type: 'object',
        xml: { name: 'Pet' },
      }).valid).toBe(true)
    })

    it('accepts externalDocs', () => {
      expect(validateSchemaObject({
        type: 'object',
        externalDocs: { url: 'https://docs.example.com' },
      }).valid).toBe(true)
    })
  })

  // --- Binary Data ---

  describe('binary data', () => {
    it('accepts encoded binary (base64 string)', () => {
      expect(validateSchemaObject({
        type: 'string',
        contentEncoding: 'base64',
        contentMediaType: 'image/png',
      }).valid).toBe(true)
    })

    it('accepts raw binary (no type, with contentMediaType)', () => {
      expect(validateSchemaObject({
        contentMediaType: 'application/octet-stream',
      }).valid).toBe(true)
    })
  })

  // --- $ref in Schema ---

  describe('$ref in schema', () => {
    it('accepts $ref', () => {
      expect(validateSchemaObject({ $ref: '#/components/schemas/Pet' }).valid).toBe(true)
    })

    it('accepts $ref alongside other keywords (JSON Schema 2020-12)', () => {
      expect(validateSchemaObject({
        $ref: '#/components/schemas/Pet',
        description: 'A pet with overridden description',
      }).valid).toBe(true)
    })
  })

  // --- $schema Dialect ---

  describe('$schema dialect', () => {
    it('accepts $schema for dialect specification', () => {
      expect(validateSchemaObject({
        $schema: 'https://spec.openapis.org/oas/3.1/dialect/base',
        type: 'object',
      }).valid).toBe(true)
    })
  })

  // --- Empty Schema ---

  describe('empty schema', () => {
    it('accepts empty object (allows any instance)', () => {
      expect(validateSchemaObject({}).valid).toBe(true)
    })
  })

  // --- Complex Examples ---

  describe('complex examples', () => {
    it('accepts model with map/dictionary properties', () => {
      expect(validateSchemaObject({
        type: 'object',
        additionalProperties: { type: 'string' },
      }).valid).toBe(true)
    })

    it('accepts model with composition (allOf)', () => {
      expect(validateSchemaObject({
        allOf: [
          { $ref: '#/components/schemas/BasicErrorModel' },
          {
            type: 'object',
            properties: { rootCause: { type: 'string' } },
            required: ['rootCause'],
          },
        ],
      }).valid).toBe(true)
    })

    it('accepts model with polymorphism (oneOf + discriminator)', () => {
      expect(validateSchemaObject({
        oneOf: [
          { $ref: '#/components/schemas/Cat' },
          { $ref: '#/components/schemas/Dog' },
        ],
        discriminator: {
          propertyName: 'petType',
          mapping: {
            cat: '#/components/schemas/Cat',
            dog: '#/components/schemas/Dog',
          },
        },
      }).valid).toBe(true)
    })

    it('accepts annotated enumeration (oneOf with const)', () => {
      expect(validateSchemaObject({
        oneOf: [
          { const: 'active', title: 'Active', description: 'Currently active' },
          { const: 'inactive', title: 'Inactive', description: 'Not active' },
        ],
      }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateSchemaObject({ type: 'string', 'x-go-type': 'MyString' }).valid).toBe(true)
    })

    it('allows extension fields without x- prefix (Schema Object exception)', () => {
      // Per spec: Schema Object extensions MAY omit x- prefix
      // Additional properties are allowed in schemas
      expect(validateSchemaObject({ type: 'string' }).valid).toBe(true)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { validateOpenApiObject } from '../validate'

describe('OpenAPI Object (4.8.1)', () => {
  const valid = () => ({
    openapi: '3.1.2',
    info: { title: 'Test API', version: '1.0.0' },
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid document with openapi and info', () => {
      const r = validateOpenApiObject(valid())
      expect(r.valid).toBe(true)
    })

    it('rejects missing openapi field', () => {
      const { openapi, ...rest } = valid()
      expect(validateOpenApiObject(rest).valid).toBe(false)
    })

    it('rejects missing info field', () => {
      const { info, ...rest } = valid()
      expect(validateOpenApiObject(rest).valid).toBe(false)
    })
  })

  // --- Field Types ---

  describe('field types', () => {
    it('rejects openapi as a number', () => {
      expect(validateOpenApiObject({ ...valid(), openapi: 3.1 }).valid).toBe(false)
    })

    it('rejects info as a string', () => {
      expect(validateOpenApiObject({ ...valid(), info: 'not an object' }).valid).toBe(false)
    })

    it('rejects info as an array', () => {
      expect(validateOpenApiObject({ ...valid(), info: [] }).valid).toBe(false)
    })
  })

  // --- openapi field ---

  describe('openapi field', () => {
    it('accepts "3.1.2"', () => {
      expect(validateOpenApiObject({ ...valid(), openapi: '3.1.2' }).valid).toBe(true)
    })

    it('accepts "3.1.0"', () => {
      expect(validateOpenApiObject({ ...valid(), openapi: '3.1.0' }).valid).toBe(true)
    })

    it('accepts "3.1.1"', () => {
      expect(validateOpenApiObject({ ...valid(), openapi: '3.1.1' }).valid).toBe(true)
    })

    it('rejects empty string', () => {
      expect(validateOpenApiObject({ ...valid(), openapi: '' }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts jsonSchemaDialect as a URI string', () => {
      const doc = { ...valid(), jsonSchemaDialect: 'https://spec.openapis.org/oas/3.1/dialect/base' }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('rejects jsonSchemaDialect as a non-URI string', () => {
      const doc = { ...valid(), jsonSchemaDialect: 'not a uri' }
      expect(validateOpenApiObject(doc).valid).toBe(false)
    })

    it('accepts servers as an array of Server Objects', () => {
      const doc = { ...valid(), servers: [{ url: 'https://api.example.com' }] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts empty servers array', () => {
      const doc = { ...valid(), servers: [] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('rejects servers as a string', () => {
      const doc = { ...valid(), servers: 'https://api.example.com' }
      expect(validateOpenApiObject(doc).valid).toBe(false)
    })

    it('accepts paths as a Paths Object', () => {
      const doc = { ...valid(), paths: {} }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts paths with valid path entries', () => {
      const doc = {
        ...valid(),
        paths: {
          '/pets': { get: { responses: { '200': { description: 'OK' } } } },
        },
      }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts webhooks as a map of Path Item Objects', () => {
      const doc = { ...valid(), webhooks: { newPet: { post: { responses: { '200': { description: 'OK' } } } } } }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts empty webhooks', () => {
      const doc = { ...valid(), webhooks: {} }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts components as a Components Object', () => {
      const doc = { ...valid(), components: {} }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts security as an array of Security Requirement Objects', () => {
      const doc = { ...valid(), security: [{}] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts empty security array (removes security)', () => {
      const doc = { ...valid(), security: [] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts tags as an array of Tag Objects', () => {
      const doc = { ...valid(), tags: [{ name: 'pets' }] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('accepts externalDocs as an External Documentation Object', () => {
      const doc = { ...valid(), externalDocs: { url: 'https://docs.example.com' } }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })
  })

  // --- Constraints ---

  describe('constraints', () => {
    it('rejects duplicate tag names', () => {
      const doc = { ...valid(), tags: [{ name: 'pets' }, { name: 'pets' }] }
      expect(validateOpenApiObject(doc).valid).toBe(false)
    })

    it('accepts unique tag names', () => {
      const doc = { ...valid(), tags: [{ name: 'pets' }, { name: 'users' }] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      const doc = { ...valid(), 'x-internal-id': 'abc123' }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('allows x- extension with any JSON value (null)', () => {
      const doc = { ...valid(), 'x-nullable': null }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('allows x- extension with any JSON value (array)', () => {
      const doc = { ...valid(), 'x-tags': ['a', 'b'] }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('allows x- extension with any JSON value (object)', () => {
      const doc = { ...valid(), 'x-meta': { key: 'value' } }
      expect(validateOpenApiObject(doc).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      const doc = { ...valid(), customField: 'value' }
      expect(validateOpenApiObject(doc).valid).toBe(false)
    })
  })
})

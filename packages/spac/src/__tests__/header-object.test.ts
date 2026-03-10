import { describe, it, expect } from 'vitest'
import { validateHeaderObject } from '../validate'

describe('Header Object (4.8.21)', () => {
  const valid = () => ({
    schema: { type: 'integer' },
  })

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty header object', () => {
      expect(validateHeaderObject({}).valid).toBe(true)
    })

    it('accepts header with schema', () => {
      expect(validateHeaderObject(valid()).valid).toBe(true)
    })
  })

  // --- Forbidden Fields (differs from Parameter Object) ---

  describe('forbidden fields (not allowed on Header)', () => {
    it('rejects name field (name comes from headers map key)', () => {
      expect(validateHeaderObject({ ...valid(), name: 'X-Rate-Limit' }).valid).toBe(false)
    })

    it('rejects in field (implicitly "header")', () => {
      expect(validateHeaderObject({ ...valid(), in: 'header' }).valid).toBe(false)
    })

    it('rejects allowEmptyValue', () => {
      expect(validateHeaderObject({ ...valid(), allowEmptyValue: true }).valid).toBe(false)
    })

    it('rejects allowReserved', () => {
      expect(validateHeaderObject({ ...valid(), allowReserved: true }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts description', () => {
      expect(validateHeaderObject({ ...valid(), description: 'Rate limit' }).valid).toBe(true)
    })

    it('accepts required as boolean', () => {
      expect(validateHeaderObject({ ...valid(), required: true }).valid).toBe(true)
    })

    it('accepts deprecated as boolean', () => {
      expect(validateHeaderObject({ ...valid(), deprecated: true }).valid).toBe(true)
    })

    it('accepts explode as boolean', () => {
      expect(validateHeaderObject({ ...valid(), explode: false }).valid).toBe(true)
    })

    it('accepts example', () => {
      expect(validateHeaderObject({ ...valid(), example: 100 }).valid).toBe(true)
    })

    it('accepts examples map', () => {
      expect(validateHeaderObject({
        ...valid(),
        examples: { limit: { value: 100 } },
      }).valid).toBe(true)
    })
  })

  // --- style field ---

  describe('style field', () => {
    it('accepts style: "simple" (only valid value)', () => {
      expect(validateHeaderObject({ ...valid(), style: 'simple' }).valid).toBe(true)
    })

    it('rejects style: "form"', () => {
      expect(validateHeaderObject({ ...valid(), style: 'form' }).valid).toBe(false)
    })

    it('rejects style: "matrix"', () => {
      expect(validateHeaderObject({ ...valid(), style: 'matrix' }).valid).toBe(false)
    })

    it('rejects style: "label"', () => {
      expect(validateHeaderObject({ ...valid(), style: 'label' }).valid).toBe(false)
    })

    it('rejects style: "deepObject"', () => {
      expect(validateHeaderObject({ ...valid(), style: 'deepObject' }).valid).toBe(false)
    })
  })

  // --- schema vs content ---

  describe('schema vs content mutual exclusivity', () => {
    it('accepts header with schema', () => {
      expect(validateHeaderObject({ schema: { type: 'string' } }).valid).toBe(true)
    })

    it('accepts header with content', () => {
      expect(validateHeaderObject({
        content: { 'application/json': { schema: { type: 'object' } } },
      }).valid).toBe(true)
    })

    it('rejects header with both schema and content', () => {
      expect(validateHeaderObject({
        schema: { type: 'string' },
        content: { 'application/json': {} },
      }).valid).toBe(false)
    })

    it('rejects content map with more than one entry', () => {
      expect(validateHeaderObject({
        content: {
          'application/json': {},
          'application/xml': {},
        },
      }).valid).toBe(false)
    })
  })

  // --- example vs examples ---

  describe('example vs examples mutual exclusivity', () => {
    it('rejects both example and examples', () => {
      expect(validateHeaderObject({
        ...valid(),
        example: 100,
        examples: { limit: { value: 100 } },
      }).valid).toBe(false)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateHeaderObject({ ...valid(), 'x-header-type': 'rate-limit' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateHeaderObject({ ...valid(), headerType: 'rate-limit' }).valid).toBe(false)
    })
  })
})

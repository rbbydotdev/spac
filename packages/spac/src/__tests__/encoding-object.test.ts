import { describe, it, expect } from 'vitest'
import { validateEncodingObject } from '../validate'

describe('Encoding Object (4.8.15)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateEncodingObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts contentType as a string', () => {
      expect(validateEncodingObject({ contentType: 'application/json' }).valid).toBe(true)
    })

    it('accepts contentType as comma-separated media types', () => {
      expect(validateEncodingObject({ contentType: 'application/json, application/xml' }).valid).toBe(true)
    })

    it('accepts headers map', () => {
      expect(validateEncodingObject({
        headers: {
          'X-Custom': { schema: { type: 'string' } },
        },
      }).valid).toBe(true)
    })

    it('accepts headers with Reference Objects', () => {
      expect(validateEncodingObject({
        headers: {
          'X-Custom': { $ref: '#/components/headers/Custom' },
        },
      }).valid).toBe(true)
    })

    it('accepts style as a string', () => {
      expect(validateEncodingObject({ style: 'form' }).valid).toBe(true)
    })

    it('accepts explode as a boolean', () => {
      expect(validateEncodingObject({ explode: true }).valid).toBe(true)
    })

    it('accepts allowReserved as a boolean', () => {
      expect(validateEncodingObject({ allowReserved: true }).valid).toBe(true)
    })
  })

  // --- Constraints ---

  describe('constraints', () => {
    it('rejects style as a number', () => {
      expect(validateEncodingObject({ style: 42 }).valid).toBe(false)
    })

    it('rejects explode as a string', () => {
      expect(validateEncodingObject({ explode: 'yes' }).valid).toBe(false)
    })

    it('rejects allowReserved as a string', () => {
      expect(validateEncodingObject({ allowReserved: 'yes' }).valid).toBe(false)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateEncodingObject({ 'x-encoder': 'custom' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateEncodingObject({ encoder: 'custom' }).valid).toBe(false)
    })
  })
})

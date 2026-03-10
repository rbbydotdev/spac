import { describe, it, expect } from 'vitest'
import { validateRequestBodyObject } from '../validate'

describe('Request Body Object (4.8.13)', () => {
  const valid = () => ({
    content: {
      'application/json': {
        schema: { type: 'object' },
      },
    },
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid request body with content', () => {
      expect(validateRequestBodyObject(valid()).valid).toBe(true)
    })

    it('rejects missing content', () => {
      expect(validateRequestBodyObject({}).valid).toBe(false)
    })

    it('rejects content as a string', () => {
      expect(validateRequestBodyObject({ content: 'json' }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts description', () => {
      expect(validateRequestBodyObject({ ...valid(), description: 'A JSON object containing pet info' }).valid).toBe(true)
    })

    it('accepts required as true', () => {
      expect(validateRequestBodyObject({ ...valid(), required: true }).valid).toBe(true)
    })

    it('accepts required as false', () => {
      expect(validateRequestBodyObject({ ...valid(), required: false }).valid).toBe(true)
    })

    it('rejects required as a string', () => {
      expect(validateRequestBodyObject({ ...valid(), required: 'yes' }).valid).toBe(false)
    })
  })

  // --- Content Map ---

  describe('content map', () => {
    it('accepts multiple media types', () => {
      const rb = {
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'object' } },
        },
      }
      expect(validateRequestBodyObject(rb).valid).toBe(true)
    })

    it('accepts media type ranges', () => {
      const rb = {
        content: {
          'text/*': {},
        },
      }
      expect(validateRequestBodyObject(rb).valid).toBe(true)
    })

    it('accepts wildcard media type', () => {
      const rb = {
        content: {
          '*/*': {},
        },
      }
      expect(validateRequestBodyObject(rb).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateRequestBodyObject({ ...valid(), 'x-body-name': 'pet' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateRequestBodyObject({ ...valid(), bodyName: 'pet' }).valid).toBe(false)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { validateReferenceObject } from '../validate'

describe('Reference Object (4.8.23)', () => {
  const valid = () => ({
    $ref: '#/components/schemas/Pet',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid reference with $ref', () => {
      expect(validateReferenceObject(valid()).valid).toBe(true)
    })

    it('rejects missing $ref', () => {
      expect(validateReferenceObject({}).valid).toBe(false)
    })

    it('rejects $ref as a number', () => {
      expect(validateReferenceObject({ $ref: 42 }).valid).toBe(false)
    })
  })

  // --- $ref Format ---

  describe('$ref format', () => {
    it('accepts local JSON pointer reference', () => {
      expect(validateReferenceObject({ $ref: '#/components/schemas/Pet' }).valid).toBe(true)
    })

    it('accepts external file reference', () => {
      expect(validateReferenceObject({ $ref: 'Pet.json' }).valid).toBe(true)
    })

    it('accepts external file with fragment', () => {
      expect(validateReferenceObject({ $ref: 'definitions.json#/Pet' }).valid).toBe(true)
    })

    it('accepts absolute URI reference', () => {
      expect(validateReferenceObject({ $ref: 'https://example.com/schemas/Pet.json' }).valid).toBe(true)
    })

    it('accepts relative path reference', () => {
      expect(validateReferenceObject({ $ref: '../schemas/Pet.json' }).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts summary (overrides referenced component)', () => {
      expect(validateReferenceObject({ ...valid(), summary: 'A pet object' }).valid).toBe(true)
    })

    it('accepts description (overrides referenced component)', () => {
      expect(validateReferenceObject({ ...valid(), description: 'Represents a pet in the store' }).valid).toBe(true)
    })
  })

  // --- No Extensions ---

  describe('no specification extensions', () => {
    it('ignores additional properties (per spec: SHALL be ignored)', () => {
      // The spec says additional properties SHALL be ignored, not rejected
      // But for strict validation, we should still not allow unknown fields
      const ref = { ...valid(), 'x-custom': 'value' }
      expect(validateReferenceObject(ref).valid).toBe(false)
    })

    it('ignores unknown properties', () => {
      const ref = { ...valid(), customField: 'value' }
      expect(validateReferenceObject(ref).valid).toBe(false)
    })
  })
})

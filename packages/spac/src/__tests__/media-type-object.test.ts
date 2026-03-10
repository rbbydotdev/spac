import { describe, it, expect } from 'vitest'
import { validateMediaTypeObject } from '../validate'

describe('Media Type Object (4.8.14)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateMediaTypeObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts schema', () => {
      expect(validateMediaTypeObject({ schema: { type: 'object' } }).valid).toBe(true)
    })

    it('accepts example', () => {
      expect(validateMediaTypeObject({ example: { name: 'Fido' } }).valid).toBe(true)
    })

    it('accepts examples map', () => {
      expect(validateMediaTypeObject({
        examples: {
          cat: { value: { name: 'Whiskers' } },
          dog: { value: { name: 'Fido' } },
        },
      }).valid).toBe(true)
    })

    it('accepts encoding map', () => {
      expect(validateMediaTypeObject({
        schema: {
          type: 'object',
          properties: {
            profileImage: { type: 'string', contentMediaType: 'image/png' },
          },
        },
        encoding: {
          profileImage: { contentType: 'image/png' },
        },
      }).valid).toBe(true)
    })
  })

  // --- example vs examples ---

  describe('example vs examples mutual exclusivity', () => {
    it('rejects both example and examples', () => {
      expect(validateMediaTypeObject({
        example: { name: 'Fido' },
        examples: { dog: { value: { name: 'Fido' } } },
      }).valid).toBe(false)
    })

    it('accepts example alone', () => {
      expect(validateMediaTypeObject({ example: { name: 'Fido' } }).valid).toBe(true)
    })

    it('accepts examples alone', () => {
      expect(validateMediaTypeObject({ examples: { dog: { value: { name: 'Fido' } } } }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateMediaTypeObject({ 'x-parser': 'custom' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateMediaTypeObject({ parser: 'custom' }).valid).toBe(false)
    })
  })
})

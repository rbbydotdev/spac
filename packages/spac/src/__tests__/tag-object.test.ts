import { describe, it, expect } from 'vitest'
import { validateTagObject } from '../validate'

describe('Tag Object (4.8.22)', () => {
  const valid = () => ({
    name: 'pets',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid tag with name', () => {
      expect(validateTagObject(valid()).valid).toBe(true)
    })

    it('rejects missing name', () => {
      expect(validateTagObject({}).valid).toBe(false)
    })

    it('rejects name as a number', () => {
      expect(validateTagObject({ name: 42 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts description', () => {
      expect(validateTagObject({ ...valid(), description: 'Everything about your pets' }).valid).toBe(true)
    })

    it('accepts description with CommonMark', () => {
      expect(validateTagObject({ ...valid(), description: '**Pets** operations' }).valid).toBe(true)
    })

    it('accepts externalDocs', () => {
      expect(validateTagObject({
        ...valid(),
        externalDocs: { url: 'https://docs.example.com/pets' },
      }).valid).toBe(true)
    })

    it('rejects externalDocs as a string', () => {
      expect(validateTagObject({
        ...valid(),
        externalDocs: 'https://docs.example.com',
      }).valid).toBe(false)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Tag Object', () => {
      const tag = {
        name: 'pets',
        description: 'Pets operations',
        externalDocs: {
          description: 'Find more info here',
          url: 'https://example.com/docs/pets',
        },
      }
      expect(validateTagObject(tag).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateTagObject({ ...valid(), 'x-display-name': 'Pets' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateTagObject({ ...valid(), displayName: 'Pets' }).valid).toBe(false)
    })
  })
})

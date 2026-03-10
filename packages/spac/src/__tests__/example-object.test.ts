import { describe, it, expect } from 'vitest'
import { validateExampleObject } from '../validate'

describe('Example Object (4.8.19)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateExampleObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts summary', () => {
      expect(validateExampleObject({ summary: 'A cat example' }).valid).toBe(true)
    })

    it('accepts description', () => {
      expect(validateExampleObject({ description: 'An example of a **cat**' }).valid).toBe(true)
    })

    it('accepts value as any type (string)', () => {
      expect(validateExampleObject({ value: 'Fluffy' }).valid).toBe(true)
    })

    it('accepts value as any type (number)', () => {
      expect(validateExampleObject({ value: 42 }).valid).toBe(true)
    })

    it('accepts value as any type (object)', () => {
      expect(validateExampleObject({ value: { name: 'Fluffy', tag: 'cat' } }).valid).toBe(true)
    })

    it('accepts value as any type (array)', () => {
      expect(validateExampleObject({ value: [1, 2, 3] }).valid).toBe(true)
    })

    it('accepts value as null', () => {
      expect(validateExampleObject({ value: null }).valid).toBe(true)
    })

    it('accepts externalValue as a URI', () => {
      expect(validateExampleObject({ externalValue: 'https://example.com/examples/cat.json' }).valid).toBe(true)
    })

    it('rejects externalValue as a non-URI string', () => {
      expect(validateExampleObject({ externalValue: 'not a uri' }).valid).toBe(false)
    })
  })

  // --- value vs externalValue ---

  describe('value vs externalValue mutual exclusivity', () => {
    it('rejects both value and externalValue', () => {
      expect(validateExampleObject({
        value: { name: 'Fluffy' },
        externalValue: 'https://example.com/examples/cat.json',
      }).valid).toBe(false)
    })

    it('accepts value alone', () => {
      expect(validateExampleObject({ value: { name: 'Fluffy' } }).valid).toBe(true)
    })

    it('accepts externalValue alone', () => {
      expect(validateExampleObject({ externalValue: 'https://example.com/examples/cat.json' }).valid).toBe(true)
    })

    it('accepts neither value nor externalValue', () => {
      expect(validateExampleObject({ summary: 'No example body' }).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Example Object with value', () => {
      const example = {
        summary: 'A cat',
        description: 'An example of a **cat** pet',
        value: { name: 'Fluffy', petType: 'cat' },
      }
      expect(validateExampleObject(example).valid).toBe(true)
    })

    it('accepts a fully populated Example Object with externalValue', () => {
      const example = {
        summary: 'A cat',
        description: 'An external example',
        externalValue: 'https://example.com/examples/cat.json',
      }
      expect(validateExampleObject(example).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateExampleObject({ 'x-example-id': 'cat-1' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateExampleObject({ id: 'cat-1' }).valid).toBe(false)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { validateXmlObject } from '../validate'

describe('XML Object (4.8.26)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateXmlObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts name as a string', () => {
      expect(validateXmlObject({ name: 'animal' }).valid).toBe(true)
    })

    it('rejects name as a number', () => {
      expect(validateXmlObject({ name: 42 }).valid).toBe(false)
    })

    it('accepts namespace as a non-relative URI', () => {
      expect(validateXmlObject({ namespace: 'https://example.com/schema/pet' }).valid).toBe(true)
    })

    it('rejects namespace as a relative URI', () => {
      expect(validateXmlObject({ namespace: '../schemas/pet' }).valid).toBe(false)
    })

    it('accepts prefix as a string', () => {
      expect(validateXmlObject({ prefix: 'pet' }).valid).toBe(true)
    })

    it('rejects prefix as a number', () => {
      expect(validateXmlObject({ prefix: 42 }).valid).toBe(false)
    })

    it('accepts attribute as boolean true', () => {
      expect(validateXmlObject({ attribute: true }).valid).toBe(true)
    })

    it('accepts attribute as boolean false', () => {
      expect(validateXmlObject({ attribute: false }).valid).toBe(true)
    })

    it('rejects attribute as a string', () => {
      expect(validateXmlObject({ attribute: 'yes' }).valid).toBe(false)
    })

    it('accepts wrapped as boolean true', () => {
      expect(validateXmlObject({ wrapped: true }).valid).toBe(true)
    })

    it('accepts wrapped as boolean false', () => {
      expect(validateXmlObject({ wrapped: false }).valid).toBe(true)
    })

    it('rejects wrapped as a string', () => {
      expect(validateXmlObject({ wrapped: 'yes' }).valid).toBe(false)
    })
  })

  // --- Full Examples ---

  describe('full examples', () => {
    it('accepts XML name replacement', () => {
      expect(validateXmlObject({ name: 'animal' }).valid).toBe(true)
    })

    it('accepts XML attribute with prefix and namespace', () => {
      const xml = {
        name: 'id',
        attribute: true,
        prefix: 'smp',
        namespace: 'https://example.com/schema/sample',
      }
      expect(validateXmlObject(xml).valid).toBe(true)
    })

    it('accepts XML array wrapping', () => {
      expect(validateXmlObject({ name: 'books', wrapped: true }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateXmlObject({ 'x-xml-version': '1.0' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateXmlObject({ version: '1.0' }).valid).toBe(false)
    })
  })
})

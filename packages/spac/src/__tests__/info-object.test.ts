import { describe, it, expect } from 'vitest'
import { validateInfoObject } from '../validate'

describe('Info Object (4.8.2)', () => {
  const valid = () => ({
    title: 'Sample Pet Store App',
    version: '1.0.1',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid info with title and version', () => {
      expect(validateInfoObject(valid()).valid).toBe(true)
    })

    it('rejects missing title', () => {
      const { title, ...rest } = valid()
      expect(validateInfoObject(rest).valid).toBe(false)
    })

    it('rejects missing version', () => {
      const { version, ...rest } = valid()
      expect(validateInfoObject(rest).valid).toBe(false)
    })
  })

  // --- Field Types ---

  describe('field types', () => {
    it('rejects title as a number', () => {
      expect(validateInfoObject({ ...valid(), title: 42 }).valid).toBe(false)
    })

    it('rejects version as a number', () => {
      expect(validateInfoObject({ ...valid(), version: 1.0 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts summary', () => {
      expect(validateInfoObject({ ...valid(), summary: 'A pet store' }).valid).toBe(true)
    })

    it('accepts description (CommonMark)', () => {
      expect(validateInfoObject({ ...valid(), description: '# My API\nThis is **bold**.' }).valid).toBe(true)
    })

    it('accepts termsOfService as a URI', () => {
      expect(validateInfoObject({ ...valid(), termsOfService: 'https://example.com/tos' }).valid).toBe(true)
    })

    it('rejects termsOfService as a non-URI string', () => {
      expect(validateInfoObject({ ...valid(), termsOfService: 'not a uri' }).valid).toBe(false)
    })

    it('accepts contact as a Contact Object', () => {
      expect(validateInfoObject({ ...valid(), contact: { name: 'Support' } }).valid).toBe(true)
    })

    it('accepts license as a License Object', () => {
      expect(validateInfoObject({ ...valid(), license: { name: 'MIT' } }).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Info Object', () => {
      const info = {
        title: 'Sample Pet Store App',
        summary: 'A pet store manager.',
        description: 'This is a sample server for a pet store.',
        termsOfService: 'https://example.com/terms/',
        contact: {
          name: 'API Support',
          url: 'https://www.example.com/support',
          email: 'support@example.com',
        },
        license: {
          name: 'Apache 2.0',
          identifier: 'Apache-2.0',
        },
        version: '1.0.1',
      }
      expect(validateInfoObject(info).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateInfoObject({ ...valid(), 'x-logo': 'https://example.com/logo.png' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateInfoObject({ ...valid(), customField: 'value' }).valid).toBe(false)
    })
  })
})

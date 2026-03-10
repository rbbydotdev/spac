import { describe, it, expect } from 'vitest'
import { validateExternalDocumentationObject } from '../validate'

describe('External Documentation Object (4.8.11)', () => {
  const valid = () => ({
    url: 'https://example.com/docs',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid object with url', () => {
      expect(validateExternalDocumentationObject(valid()).valid).toBe(true)
    })

    it('rejects missing url', () => {
      expect(validateExternalDocumentationObject({}).valid).toBe(false)
    })

    it('rejects url as a number', () => {
      expect(validateExternalDocumentationObject({ url: 42 }).valid).toBe(false)
    })

    it('rejects non-URI url string', () => {
      expect(validateExternalDocumentationObject({ url: 'not a uri' }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts description as a string', () => {
      expect(validateExternalDocumentationObject({
        ...valid(),
        description: 'Find more info here',
      }).valid).toBe(true)
    })

    it('accepts description with CommonMark', () => {
      expect(validateExternalDocumentationObject({
        ...valid(),
        description: '**Bold** and [link](https://example.com)',
      }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateExternalDocumentationObject({ ...valid(), 'x-icon': 'book' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateExternalDocumentationObject({ ...valid(), icon: 'book' }).valid).toBe(false)
    })
  })
})

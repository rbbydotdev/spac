import { describe, it, expect } from 'vitest'
import { validateContactObject } from '../validate'

describe('Contact Object (4.8.3)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateContactObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts name as a string', () => {
      expect(validateContactObject({ name: 'API Support' }).valid).toBe(true)
    })

    it('rejects name as a number', () => {
      expect(validateContactObject({ name: 42 }).valid).toBe(false)
    })

    it('accepts url as a valid URI', () => {
      expect(validateContactObject({ url: 'https://www.example.com/support' }).valid).toBe(true)
    })

    it('rejects url as a non-URI string', () => {
      expect(validateContactObject({ url: 'not a url' }).valid).toBe(false)
    })

    it('accepts email as a valid email address', () => {
      expect(validateContactObject({ email: 'support@example.com' }).valid).toBe(true)
    })

    it('rejects email as an invalid email', () => {
      expect(validateContactObject({ email: 'not-an-email' }).valid).toBe(false)
    })

    it('rejects email as a number', () => {
      expect(validateContactObject({ email: 42 }).valid).toBe(false)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Contact Object', () => {
      const contact = {
        name: 'API Support',
        url: 'https://www.example.com/support',
        email: 'support@example.com',
      }
      expect(validateContactObject(contact).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateContactObject({ 'x-slack': '#api-support' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateContactObject({ phone: '555-1234' }).valid).toBe(false)
    })
  })
})

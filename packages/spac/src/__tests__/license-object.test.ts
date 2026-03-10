import { describe, it, expect } from 'vitest'
import { validateLicenseObject } from '../validate'

describe('License Object (4.8.4)', () => {
  const valid = () => ({
    name: 'Apache 2.0',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid license with name', () => {
      expect(validateLicenseObject(valid()).valid).toBe(true)
    })

    it('rejects missing name', () => {
      expect(validateLicenseObject({}).valid).toBe(false)
    })

    it('rejects name as a number', () => {
      expect(validateLicenseObject({ name: 42 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts identifier as an SPDX expression', () => {
      expect(validateLicenseObject({ ...valid(), identifier: 'Apache-2.0' }).valid).toBe(true)
    })

    it('accepts url as a valid URI', () => {
      expect(validateLicenseObject({ ...valid(), url: 'https://www.apache.org/licenses/LICENSE-2.0.html' }).valid).toBe(true)
    })

    it('rejects url as a non-URI string', () => {
      expect(validateLicenseObject({ ...valid(), url: 'not a uri' }).valid).toBe(false)
    })
  })

  // --- Mutual Exclusivity ---

  describe('mutual exclusivity', () => {
    it('rejects both identifier and url present', () => {
      const license = {
        ...valid(),
        identifier: 'Apache-2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
      }
      expect(validateLicenseObject(license).valid).toBe(false)
    })

    it('accepts identifier without url', () => {
      expect(validateLicenseObject({ ...valid(), identifier: 'MIT' }).valid).toBe(true)
    })

    it('accepts url without identifier', () => {
      expect(validateLicenseObject({ ...valid(), url: 'https://opensource.org/licenses/MIT' }).valid).toBe(true)
    })

    it('accepts neither identifier nor url', () => {
      expect(validateLicenseObject(valid()).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateLicenseObject({ ...valid(), 'x-license-type': 'permissive' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateLicenseObject({ ...valid(), type: 'permissive' }).valid).toBe(false)
    })
  })
})

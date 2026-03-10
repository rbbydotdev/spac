import { describe, it, expect } from 'vitest'
import { validateSecurityRequirementObject } from '../validate'

describe('Security Requirement Object (4.8.30)', () => {
  // --- Structure ---

  describe('structure', () => {
    it('accepts empty object (anonymous access)', () => {
      expect(validateSecurityRequirementObject({}).valid).toBe(true)
    })

    it('accepts single security scheme with empty scopes', () => {
      expect(validateSecurityRequirementObject({ api_key: [] }).valid).toBe(true)
    })

    it('accepts single security scheme with scopes', () => {
      expect(validateSecurityRequirementObject({
        oauth2: ['read:pets', 'write:pets'],
      }).valid).toBe(true)
    })

    it('accepts multiple security schemes (all must be satisfied)', () => {
      expect(validateSecurityRequirementObject({
        api_key: [],
        oauth2: ['read:pets'],
      }).valid).toBe(true)
    })
  })

  // --- Value Type ---

  describe('value type', () => {
    it('values must be arrays of strings', () => {
      expect(validateSecurityRequirementObject({ api_key: [] }).valid).toBe(true)
    })

    it('rejects value as a string (must be array)', () => {
      expect(validateSecurityRequirementObject({ api_key: 'read' }).valid).toBe(false)
    })

    it('rejects value as an object', () => {
      expect(validateSecurityRequirementObject({ api_key: {} }).valid).toBe(false)
    })

    it('rejects array with non-string elements', () => {
      expect(validateSecurityRequirementObject({ api_key: [42] }).valid).toBe(false)
    })

    it('rejects value as a boolean', () => {
      expect(validateSecurityRequirementObject({ api_key: true }).valid).toBe(false)
    })
  })

  // --- Examples ---

  describe('examples from spec', () => {
    it('accepts non-OAuth2 security requirement', () => {
      expect(validateSecurityRequirementObject({ api_key: [] }).valid).toBe(true)
    })

    it('accepts OAuth2 security requirement with scopes', () => {
      expect(validateSecurityRequirementObject({
        petstore_auth: ['write:pets', 'read:pets'],
      }).valid).toBe(true)
    })

    it('accepts optional OAuth2 (with empty requirement)', () => {
      // In the array at OpenAPI/Operation level, this would be one entry
      expect(validateSecurityRequirementObject({}).valid).toBe(true)
    })
  })

  // --- No Specification Extensions ---

  describe('no specification extensions', () => {
    it('does not support x- extension fields (values must be string arrays)', () => {
      // Every key is a security scheme name, values must be [string]
      // x- fields would be treated as scheme names, which is valid
      // but their values must still be string arrays
      expect(validateSecurityRequirementObject({ 'x-custom': ['scope'] }).valid).toBe(true)
    })
  })
})

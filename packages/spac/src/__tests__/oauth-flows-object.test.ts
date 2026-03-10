import { describe, it, expect } from 'vitest'
import { validateOAuthFlowsObject } from '../validate'

describe('OAuth Flows Object (4.8.28)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateOAuthFlowsObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts implicit flow', () => {
      expect(validateOAuthFlowsObject({
        implicit: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          scopes: { 'read:pets': 'Read pets' },
        },
      }).valid).toBe(true)
    })

    it('accepts password flow', () => {
      expect(validateOAuthFlowsObject({
        password: {
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {},
        },
      }).valid).toBe(true)
    })

    it('accepts clientCredentials flow', () => {
      expect(validateOAuthFlowsObject({
        clientCredentials: {
          tokenUrl: 'https://example.com/oauth/token',
          scopes: { admin: 'Admin access' },
        },
      }).valid).toBe(true)
    })

    it('accepts authorizationCode flow', () => {
      expect(validateOAuthFlowsObject({
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          scopes: { 'write:pets': 'Modify pets' },
        },
      }).valid).toBe(true)
    })

    it('accepts multiple flows', () => {
      expect(validateOAuthFlowsObject({
        implicit: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          scopes: {},
        },
        authorizationCode: {
          authorizationUrl: 'https://example.com/oauth/authorize',
          tokenUrl: 'https://example.com/oauth/token',
          scopes: {},
        },
      }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateOAuthFlowsObject({ 'x-default-flow': 'authorizationCode' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateOAuthFlowsObject({ defaultFlow: 'authorizationCode' }).valid).toBe(false)
    })
  })
})

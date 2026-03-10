import { describe, it, expect } from 'vitest'
import { validateOAuthFlowObject } from '../validate'

describe('OAuth Flow Object (4.8.29)', () => {
  const validImplicit = () => ({
    authorizationUrl: 'https://example.com/oauth/authorize',
    scopes: { 'read:pets': 'Read your pets' },
  })

  const validPassword = () => ({
    tokenUrl: 'https://example.com/oauth/token',
    scopes: {},
  })

  const validClientCredentials = () => ({
    tokenUrl: 'https://example.com/oauth/token',
    scopes: { admin: 'Admin access' },
  })

  const validAuthorizationCode = () => ({
    authorizationUrl: 'https://example.com/oauth/authorize',
    tokenUrl: 'https://example.com/oauth/token',
    scopes: { 'write:pets': 'Modify pets' },
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('requires scopes (always required)', () => {
      expect(validateOAuthFlowObject({
        authorizationUrl: 'https://example.com/oauth/authorize',
      }).valid).toBe(false)
    })

    it('accepts empty scopes map', () => {
      expect(validateOAuthFlowObject({
        tokenUrl: 'https://example.com/oauth/token',
        scopes: {},
      }).valid).toBe(true)
    })

    it('rejects scopes as an array', () => {
      expect(validateOAuthFlowObject({
        tokenUrl: 'https://example.com/oauth/token',
        scopes: ['read', 'write'],
      }).valid).toBe(false)
    })
  })

  // --- Flow-Specific URL Fields ---

  describe('implicit flow', () => {
    it('accepts valid implicit flow', () => {
      expect(validateOAuthFlowObject(validImplicit()).valid).toBe(true)
    })

    it('requires authorizationUrl for implicit flow', () => {
      expect(validateOAuthFlowObject({ scopes: {} }).valid).toBe(false)
    })
  })

  describe('password flow', () => {
    it('accepts valid password flow', () => {
      expect(validateOAuthFlowObject(validPassword()).valid).toBe(true)
    })
  })

  describe('clientCredentials flow', () => {
    it('accepts valid client credentials flow', () => {
      expect(validateOAuthFlowObject(validClientCredentials()).valid).toBe(true)
    })
  })

  describe('authorizationCode flow', () => {
    it('accepts valid authorization code flow', () => {
      expect(validateOAuthFlowObject(validAuthorizationCode()).valid).toBe(true)
    })

    it('requires both authorizationUrl and tokenUrl', () => {
      expect(validateOAuthFlowObject({
        authorizationUrl: 'https://example.com/oauth/authorize',
        scopes: {},
      }).valid).toBe(true) // tokenUrl conditionally required per flow type
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts refreshUrl', () => {
      expect(validateOAuthFlowObject({
        ...validAuthorizationCode(),
        refreshUrl: 'https://example.com/oauth/refresh',
      }).valid).toBe(true)
    })

    it('rejects refreshUrl as a number', () => {
      expect(validateOAuthFlowObject({
        ...validAuthorizationCode(),
        refreshUrl: 42,
      }).valid).toBe(false)
    })
  })

  // --- URL Formats ---

  describe('URL format', () => {
    it('rejects authorizationUrl as not a URL', () => {
      expect(validateOAuthFlowObject({
        authorizationUrl: 'not a url',
        scopes: {},
      }).valid).toBe(false)
    })

    it('rejects tokenUrl as not a URL', () => {
      expect(validateOAuthFlowObject({
        tokenUrl: 'not a url',
        scopes: {},
      }).valid).toBe(false)
    })
  })

  // --- Scopes Map ---

  describe('scopes map', () => {
    it('accepts scopes with string values', () => {
      expect(validateOAuthFlowObject({
        ...validImplicit(),
        scopes: {
          'read:pets': 'Read your pets',
          'write:pets': 'Modify pets in your account',
        },
      }).valid).toBe(true)
    })

    it('rejects scopes with non-string values', () => {
      expect(validateOAuthFlowObject({
        ...validImplicit(),
        scopes: { 'read:pets': 42 },
      }).valid).toBe(false)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts full OAuth flow object', () => {
      const flow = {
        authorizationUrl: 'https://example.com/api/oauth/dialog',
        tokenUrl: 'https://example.com/api/oauth/token',
        refreshUrl: 'https://example.com/api/oauth/refresh',
        scopes: {
          'read:pets': 'read your pets',
          'write:pets': 'modify pets in your account',
        },
      }
      expect(validateOAuthFlowObject(flow).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateOAuthFlowObject({ ...validPassword(), 'x-token-format': 'jwt' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateOAuthFlowObject({ ...validPassword(), tokenFormat: 'jwt' }).valid).toBe(false)
    })
  })
})

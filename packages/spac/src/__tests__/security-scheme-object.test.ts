import { describe, it, expect } from 'vitest'
import { validateSecuritySchemeObject } from '../validate'

describe('Security Scheme Object (4.8.27)', () => {
  // --- Type-Specific Valid Helpers ---

  const validApiKey = () => ({
    type: 'apiKey',
    name: 'api_key',
    in: 'header',
  })

  const validHttp = () => ({
    type: 'http',
    scheme: 'bearer',
  })

  const validOAuth2 = () => ({
    type: 'oauth2',
    flows: {
      authorizationCode: {
        authorizationUrl: 'https://example.com/oauth/authorize',
        tokenUrl: 'https://example.com/oauth/token',
        scopes: { 'read:pets': 'Read pets' },
      },
    },
  })

  const validOpenIdConnect = () => ({
    type: 'openIdConnect',
    openIdConnectUrl: 'https://example.com/.well-known/openid-configuration',
  })

  const validMutualTLS = () => ({
    type: 'mutualTLS',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('rejects missing type', () => {
      expect(validateSecuritySchemeObject({}).valid).toBe(false)
    })

    it('rejects type as a number', () => {
      expect(validateSecuritySchemeObject({ type: 42 }).valid).toBe(false)
    })
  })

  // --- type values ---

  describe('type values', () => {
    it('accepts type: "apiKey"', () => {
      expect(validateSecuritySchemeObject(validApiKey()).valid).toBe(true)
    })

    it('accepts type: "http"', () => {
      expect(validateSecuritySchemeObject(validHttp()).valid).toBe(true)
    })

    it('accepts type: "oauth2"', () => {
      expect(validateSecuritySchemeObject(validOAuth2()).valid).toBe(true)
    })

    it('accepts type: "openIdConnect"', () => {
      expect(validateSecuritySchemeObject(validOpenIdConnect()).valid).toBe(true)
    })

    it('accepts type: "mutualTLS"', () => {
      expect(validateSecuritySchemeObject(validMutualTLS()).valid).toBe(true)
    })

    it('rejects invalid type value', () => {
      expect(validateSecuritySchemeObject({ type: 'basic' }).valid).toBe(false)
    })
  })

  // --- apiKey requirements ---

  describe('apiKey type requirements', () => {
    it('requires name for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', in: 'header' }).valid).toBe(false)
    })

    it('requires in for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', name: 'api_key' }).valid).toBe(false)
    })

    it('accepts in: "query" for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', name: 'api_key', in: 'query' }).valid).toBe(true)
    })

    it('accepts in: "header" for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', name: 'api_key', in: 'header' }).valid).toBe(true)
    })

    it('accepts in: "cookie" for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', name: 'session', in: 'cookie' }).valid).toBe(true)
    })

    it('rejects in: "path" for apiKey', () => {
      expect(validateSecuritySchemeObject({ type: 'apiKey', name: 'api_key', in: 'path' }).valid).toBe(false)
    })
  })

  // --- http requirements ---

  describe('http type requirements', () => {
    it('requires scheme for http', () => {
      expect(validateSecuritySchemeObject({ type: 'http' }).valid).toBe(false)
    })

    it('accepts scheme: "bearer"', () => {
      expect(validateSecuritySchemeObject({ type: 'http', scheme: 'bearer' }).valid).toBe(true)
    })

    it('accepts scheme: "basic"', () => {
      expect(validateSecuritySchemeObject({ type: 'http', scheme: 'basic' }).valid).toBe(true)
    })

    it('accepts bearerFormat for bearer scheme', () => {
      expect(validateSecuritySchemeObject({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }).valid).toBe(true)
    })
  })

  // --- oauth2 requirements ---

  describe('oauth2 type requirements', () => {
    it('requires flows for oauth2', () => {
      expect(validateSecuritySchemeObject({ type: 'oauth2' }).valid).toBe(false)
    })

    it('accepts implicit flow', () => {
      expect(validateSecuritySchemeObject({
        type: 'oauth2',
        flows: {
          implicit: {
            authorizationUrl: 'https://example.com/oauth/authorize',
            scopes: { 'read:pets': 'Read pets' },
          },
        },
      }).valid).toBe(true)
    })

    it('accepts password flow', () => {
      expect(validateSecuritySchemeObject({
        type: 'oauth2',
        flows: {
          password: {
            tokenUrl: 'https://example.com/oauth/token',
            scopes: {},
          },
        },
      }).valid).toBe(true)
    })

    it('accepts clientCredentials flow', () => {
      expect(validateSecuritySchemeObject({
        type: 'oauth2',
        flows: {
          clientCredentials: {
            tokenUrl: 'https://example.com/oauth/token',
            scopes: {},
          },
        },
      }).valid).toBe(true)
    })
  })

  // --- openIdConnect requirements ---

  describe('openIdConnect type requirements', () => {
    it('requires openIdConnectUrl', () => {
      expect(validateSecuritySchemeObject({ type: 'openIdConnect' }).valid).toBe(false)
    })

    it('accepts valid openIdConnectUrl', () => {
      expect(validateSecuritySchemeObject(validOpenIdConnect()).valid).toBe(true)
    })
  })

  // --- Optional description ---

  describe('optional fields', () => {
    it('accepts description for any type', () => {
      expect(validateSecuritySchemeObject({ ...validApiKey(), description: 'API key auth' }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateSecuritySchemeObject({ ...validApiKey(), 'x-auth-provider': 'internal' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateSecuritySchemeObject({ ...validApiKey(), provider: 'internal' }).valid).toBe(false)
    })
  })
})

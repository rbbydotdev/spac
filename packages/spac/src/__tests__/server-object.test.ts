import { describe, it, expect } from 'vitest'
import { validateServerObject } from '../validate'

describe('Server Object (4.8.5)', () => {
  const valid = () => ({
    url: 'https://api.example.com/v1',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid server with url', () => {
      expect(validateServerObject(valid()).valid).toBe(true)
    })

    it('rejects missing url', () => {
      expect(validateServerObject({}).valid).toBe(false)
    })

    it('rejects url as a number', () => {
      expect(validateServerObject({ url: 42 }).valid).toBe(false)
    })
  })

  // --- URL Field ---

  describe('url field', () => {
    it('accepts relative URL', () => {
      expect(validateServerObject({ url: '/v1' }).valid).toBe(true)
    })

    it('accepts root-only URL "/"', () => {
      expect(validateServerObject({ url: '/' }).valid).toBe(true)
    })

    it('accepts URL with server variables', () => {
      expect(validateServerObject({ url: 'https://{environment}.example.com/{version}' }).valid).toBe(true)
    })

    it('rejects URL with query string', () => {
      expect(validateServerObject({ url: 'https://api.example.com?key=val' }).valid).toBe(false)
    })

    it('rejects URL with fragment', () => {
      expect(validateServerObject({ url: 'https://api.example.com#section' }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts description as a string', () => {
      expect(validateServerObject({ ...valid(), description: 'Production server' }).valid).toBe(true)
    })

    it('accepts variables as a map of Server Variable Objects', () => {
      const server = {
        url: 'https://{environment}.example.com',
        variables: {
          environment: { default: 'production' },
        },
      }
      expect(validateServerObject(server).valid).toBe(true)
    })

    it('accepts variables with enum', () => {
      const server = {
        url: 'https://{environment}.example.com',
        variables: {
          environment: {
            default: 'production',
            enum: ['production', 'staging', 'development'],
            description: 'Server environment',
          },
        },
      }
      expect(validateServerObject(server).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts multi-variable server', () => {
      const server = {
        url: 'https://{username}.gigantic-server.com:{port}/{basePath}',
        description: 'The production API server',
        variables: {
          username: {
            default: 'demo',
            description: 'Developer username',
          },
          port: {
            enum: ['8443', '443'],
            default: '8443',
          },
          basePath: {
            default: 'v2',
          },
        },
      }
      expect(validateServerObject(server).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateServerObject({ ...valid(), 'x-internal': true }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateServerObject({ ...valid(), name: 'prod' }).valid).toBe(false)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { validateOperationObject } from '../validate'

describe('Operation Object (4.8.10)', () => {
  const valid = () => ({
    responses: {
      '200': { description: 'Successful response' },
    },
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid operation with responses', () => {
      expect(validateOperationObject(valid()).valid).toBe(true)
    })

    it('rejects missing responses', () => {
      expect(validateOperationObject({}).valid).toBe(false)
    })

    it('rejects responses as a string', () => {
      expect(validateOperationObject({ responses: 'ok' }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts tags as an array of strings', () => {
      expect(validateOperationObject({ ...valid(), tags: ['pets'] }).valid).toBe(true)
    })

    it('rejects tags as a string', () => {
      expect(validateOperationObject({ ...valid(), tags: 'pets' }).valid).toBe(false)
    })

    it('accepts summary as a string', () => {
      expect(validateOperationObject({ ...valid(), summary: 'List pets' }).valid).toBe(true)
    })

    it('accepts description as a string', () => {
      expect(validateOperationObject({ ...valid(), description: 'Returns all pets' }).valid).toBe(true)
    })

    it('accepts externalDocs as External Documentation Object', () => {
      expect(validateOperationObject({
        ...valid(),
        externalDocs: { url: 'https://docs.example.com' },
      }).valid).toBe(true)
    })

    it('accepts operationId as a string', () => {
      expect(validateOperationObject({ ...valid(), operationId: 'listPets' }).valid).toBe(true)
    })

    it('accepts parameters as an array', () => {
      expect(validateOperationObject({
        ...valid(),
        parameters: [{ name: 'limit', in: 'query' }],
      }).valid).toBe(true)
    })

    it('accepts requestBody as Request Body Object', () => {
      expect(validateOperationObject({
        ...valid(),
        requestBody: { content: { 'application/json': {} } },
      }).valid).toBe(true)
    })

    it('accepts requestBody as Reference Object', () => {
      expect(validateOperationObject({
        ...valid(),
        requestBody: { $ref: '#/components/requestBodies/NewPet' },
      }).valid).toBe(true)
    })

    it('accepts callbacks as a map', () => {
      expect(validateOperationObject({
        ...valid(),
        callbacks: {
          onEvent: { '{$request.body#/callbackUrl}': { post: { responses: { '200': { description: 'OK' } } } } },
        },
      }).valid).toBe(true)
    })

    it('accepts deprecated as a boolean', () => {
      expect(validateOperationObject({ ...valid(), deprecated: true }).valid).toBe(true)
    })

    it('rejects deprecated as a string', () => {
      expect(validateOperationObject({ ...valid(), deprecated: 'yes' }).valid).toBe(false)
    })

    it('accepts security as an array of Security Requirement Objects', () => {
      expect(validateOperationObject({ ...valid(), security: [{ api_key: [] }] }).valid).toBe(true)
    })

    it('accepts empty security array (removes top-level security)', () => {
      expect(validateOperationObject({ ...valid(), security: [] }).valid).toBe(true)
    })

    it('accepts security with empty object (optional security)', () => {
      expect(validateOperationObject({ ...valid(), security: [{}] }).valid).toBe(true)
    })

    it('accepts servers as an array of Server Objects', () => {
      expect(validateOperationObject({
        ...valid(),
        servers: [{ url: 'https://api.example.com' }],
      }).valid).toBe(true)
    })
  })

  // --- Constraints ---

  describe('constraints', () => {
    it('rejects duplicate parameters (same name + location)', () => {
      expect(validateOperationObject({
        ...valid(),
        parameters: [
          { name: 'petId', in: 'path', required: true },
          { name: 'petId', in: 'path', required: true },
        ],
      }).valid).toBe(false)
    })

    it('accepts parameters with same name but different location', () => {
      expect(validateOperationObject({
        ...valid(),
        parameters: [
          { name: 'id', in: 'path', required: true },
          { name: 'id', in: 'query' },
        ],
      }).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Operation Object', () => {
      const op = {
        tags: ['pets'],
        summary: 'List all pets',
        description: 'Returns a list of all pets in the store.',
        externalDocs: { url: 'https://docs.example.com/pets' },
        operationId: 'listPets',
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          '200': {
            description: 'A list of pets',
            content: { 'application/json': { schema: { type: 'array' } } },
          },
          default: { description: 'Unexpected error' },
        },
        deprecated: false,
        security: [{ api_key: [] }],
        servers: [{ url: 'https://api.example.com' }],
      }
      expect(validateOperationObject(op).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateOperationObject({ ...valid(), 'x-rate-limit': 100 }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateOperationObject({ ...valid(), rateLimit: 100 }).valid).toBe(false)
    })
  })
})

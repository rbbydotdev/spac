import { describe, it, expect } from 'vitest'
import { validateResponseObject } from '../validate'

describe('Response Object (4.8.17)', () => {
  const valid = () => ({
    description: 'Successful response',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid response with description', () => {
      expect(validateResponseObject(valid()).valid).toBe(true)
    })

    it('rejects missing description', () => {
      expect(validateResponseObject({}).valid).toBe(false)
    })

    it('rejects description as a number', () => {
      expect(validateResponseObject({ description: 42 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts headers map', () => {
      expect(validateResponseObject({
        ...valid(),
        headers: { 'X-Rate-Limit': { schema: { type: 'integer' } } },
      }).valid).toBe(true)
    })

    it('accepts headers with Reference Objects', () => {
      expect(validateResponseObject({
        ...valid(),
        headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
      }).valid).toBe(true)
    })

    it('accepts content map', () => {
      expect(validateResponseObject({
        ...valid(),
        content: { 'application/json': { schema: { type: 'object' } } },
      }).valid).toBe(true)
    })

    it('accepts multiple content media types', () => {
      expect(validateResponseObject({
        ...valid(),
        content: {
          'application/json': { schema: { type: 'object' } },
          'application/xml': { schema: { type: 'object' } },
        },
      }).valid).toBe(true)
    })

    it('accepts links map', () => {
      expect(validateResponseObject({
        ...valid(),
        links: { GetPetById: { operationId: 'getPet' } },
      }).valid).toBe(true)
    })

    it('accepts links with Reference Objects', () => {
      expect(validateResponseObject({
        ...valid(),
        links: { GetPetById: { $ref: '#/components/links/GetPet' } },
      }).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Response Object', () => {
      const response = {
        description: 'A list of pets',
        headers: {
          'X-Rate-Limit-Limit': { description: 'Rate limit ceiling', schema: { type: 'integer' } },
          'X-Rate-Limit-Remaining': { description: 'Rate limit remaining', schema: { type: 'integer' } },
        },
        content: {
          'application/json': {
            schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
          },
        },
        links: {
          GetNextPage: { operationId: 'listPets' },
        },
      }
      expect(validateResponseObject(response).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateResponseObject({ ...valid(), 'x-response-code': 200 }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateResponseObject({ ...valid(), statusCode: 200 }).valid).toBe(false)
    })
  })
})

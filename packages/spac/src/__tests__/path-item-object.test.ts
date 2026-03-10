import { describe, it, expect } from 'vitest'
import { validatePathItemObject } from '../validate'

describe('Path Item Object (4.8.9)', () => {
  const valid = () => ({})

  const minimalOp = () => ({
    responses: { '200': { description: 'OK' } },
  })

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty Path Item Object (may be empty due to ACL)', () => {
      expect(validatePathItemObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts $ref', () => {
      expect(validatePathItemObject({ $ref: '#/components/pathItems/pets' }).valid).toBe(true)
    })

    it('accepts summary', () => {
      expect(validatePathItemObject({ summary: 'Pet operations' }).valid).toBe(true)
    })

    it('accepts description', () => {
      expect(validatePathItemObject({ description: 'Operations on pets' }).valid).toBe(true)
    })

    it('accepts servers array', () => {
      expect(validatePathItemObject({ servers: [{ url: 'https://api.example.com' }] }).valid).toBe(true)
    })

    it('accepts parameters array', () => {
      expect(validatePathItemObject({
        parameters: [{ name: 'petId', in: 'path', required: true }],
      }).valid).toBe(true)
    })
  })

  // --- HTTP Method Operations ---

  describe('HTTP method operations', () => {
    it('accepts get operation', () => {
      expect(validatePathItemObject({ get: minimalOp() }).valid).toBe(true)
    })

    it('accepts put operation', () => {
      expect(validatePathItemObject({ put: minimalOp() }).valid).toBe(true)
    })

    it('accepts post operation', () => {
      expect(validatePathItemObject({ post: minimalOp() }).valid).toBe(true)
    })

    it('accepts delete operation', () => {
      expect(validatePathItemObject({ delete: minimalOp() }).valid).toBe(true)
    })

    it('accepts options operation', () => {
      expect(validatePathItemObject({ options: minimalOp() }).valid).toBe(true)
    })

    it('accepts head operation', () => {
      expect(validatePathItemObject({ head: minimalOp() }).valid).toBe(true)
    })

    it('accepts patch operation', () => {
      expect(validatePathItemObject({ patch: minimalOp() }).valid).toBe(true)
    })

    it('accepts trace operation', () => {
      expect(validatePathItemObject({ trace: minimalOp() }).valid).toBe(true)
    })

    it('accepts multiple operations on the same path', () => {
      const pathItem = {
        get: minimalOp(),
        post: minimalOp(),
        put: minimalOp(),
        delete: minimalOp(),
      }
      expect(validatePathItemObject(pathItem).valid).toBe(true)
    })
  })

  // --- Parameters ---

  describe('parameters', () => {
    it('accepts Reference Objects in parameters array', () => {
      expect(validatePathItemObject({
        parameters: [{ $ref: '#/components/parameters/PetId' }],
      }).valid).toBe(true)
    })

    it('accepts mix of Parameter Objects and Reference Objects', () => {
      expect(validatePathItemObject({
        parameters: [
          { name: 'petId', in: 'path', required: true },
          { $ref: '#/components/parameters/Limit' },
        ],
      }).valid).toBe(true)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Path Item Object', () => {
      const pathItem = {
        summary: 'Pet resource',
        description: 'Operations on pets',
        get: {
          summary: 'List all pets',
          operationId: 'listPets',
          responses: { '200': { description: 'A list of pets' } },
        },
        post: {
          summary: 'Create a pet',
          operationId: 'createPet',
          responses: { '201': { description: 'Pet created' } },
        },
        parameters: [{ name: 'X-Request-Id', in: 'header' }],
        servers: [{ url: 'https://api.example.com' }],
      }
      expect(validatePathItemObject(pathItem).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validatePathItemObject({ 'x-controller': 'PetController' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validatePathItemObject({ controller: 'PetController' }).valid).toBe(false)
    })
  })
})

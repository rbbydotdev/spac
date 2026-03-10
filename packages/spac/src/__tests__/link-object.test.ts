import { describe, it, expect } from 'vitest'
import { validateLinkObject } from '../validate'

describe('Link Object (4.8.20)', () => {
  const valid = () => ({
    operationId: 'getPet',
  })

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty link object', () => {
      expect(validateLinkObject({}).valid).toBe(true)
    })

    it('accepts link with operationId', () => {
      expect(validateLinkObject(valid()).valid).toBe(true)
    })

    it('accepts link with operationRef', () => {
      expect(validateLinkObject({ operationRef: '#/paths/~1pets~1{petId}/get' }).valid).toBe(true)
    })
  })

  // --- operationRef vs operationId ---

  describe('operationRef vs operationId mutual exclusivity', () => {
    it('rejects both operationRef and operationId', () => {
      expect(validateLinkObject({
        operationRef: '#/paths/~1pets/get',
        operationId: 'listPets',
      }).valid).toBe(false)
    })

    it('accepts operationRef alone', () => {
      expect(validateLinkObject({ operationRef: '#/paths/~1pets/get' }).valid).toBe(true)
    })

    it('accepts operationId alone', () => {
      expect(validateLinkObject({ operationId: 'listPets' }).valid).toBe(true)
    })

    it('accepts neither (link without operation target)', () => {
      expect(validateLinkObject({ description: 'A link' }).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts parameters map', () => {
      expect(validateLinkObject({
        ...valid(),
        parameters: { petId: '$response.body#/id' },
      }).valid).toBe(true)
    })

    it('accepts parameters with constant values', () => {
      expect(validateLinkObject({
        ...valid(),
        parameters: { status: 'active' },
      }).valid).toBe(true)
    })

    it('accepts requestBody as a literal value', () => {
      expect(validateLinkObject({
        ...valid(),
        requestBody: { name: 'Fido' },
      }).valid).toBe(true)
    })

    it('accepts requestBody as a runtime expression', () => {
      expect(validateLinkObject({
        ...valid(),
        requestBody: '$response.body',
      }).valid).toBe(true)
    })

    it('accepts description', () => {
      expect(validateLinkObject({
        ...valid(),
        description: 'Get the pet by ID',
      }).valid).toBe(true)
    })

    it('accepts server as a Server Object', () => {
      expect(validateLinkObject({
        ...valid(),
        server: { url: 'https://api.example.com' },
      }).valid).toBe(true)
    })

    it('rejects server as a string', () => {
      expect(validateLinkObject({
        ...valid(),
        server: 'https://api.example.com',
      }).valid).toBe(false)
    })
  })

  // --- Full Example ---

  describe('full example', () => {
    it('accepts a fully populated Link Object', () => {
      const link = {
        operationId: 'getUserByUserId',
        parameters: { userId: '$response.body#/id' },
        description: 'The `id` value returned can be used as the `userId` parameter',
        server: { url: 'https://api.example.com' },
      }
      expect(validateLinkObject(link).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateLinkObject({ ...valid(), 'x-link-type': 'related' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateLinkObject({ ...valid(), linkType: 'related' }).valid).toBe(false)
    })
  })
})

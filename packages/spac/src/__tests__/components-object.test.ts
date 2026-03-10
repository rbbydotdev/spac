import { describe, it, expect } from 'vitest'
import { validateComponentsObject } from '../validate'

describe('Components Object (4.8.7)', () => {
  const valid = () => ({})

  // --- No Required Fields ---

  describe('structure', () => {
    it('accepts empty object (all fields optional)', () => {
      expect(validateComponentsObject(valid()).valid).toBe(true)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts schemas map', () => {
      expect(validateComponentsObject({ schemas: { Pet: { type: 'object' } } }).valid).toBe(true)
    })

    it('accepts responses map', () => {
      expect(validateComponentsObject({ responses: { NotFound: { description: 'Not found' } } }).valid).toBe(true)
    })

    it('accepts parameters map', () => {
      expect(validateComponentsObject({ parameters: { PetId: { name: 'petId', in: 'path' } } }).valid).toBe(true)
    })

    it('accepts examples map', () => {
      expect(validateComponentsObject({ examples: { Frog: { value: { name: 'Frog' } } } }).valid).toBe(true)
    })

    it('accepts requestBodies map', () => {
      expect(validateComponentsObject({ requestBodies: { NewPet: { content: { 'application/json': {} } } } }).valid).toBe(true)
    })

    it('accepts headers map', () => {
      expect(validateComponentsObject({ headers: { 'X-Rate-Limit': { schema: { type: 'integer' } } } }).valid).toBe(true)
    })

    it('accepts securitySchemes map', () => {
      expect(validateComponentsObject({ securitySchemes: { api_key: { type: 'apiKey', name: 'api_key', in: 'header' } } }).valid).toBe(true)
    })

    it('accepts links map', () => {
      expect(validateComponentsObject({ links: { GetPet: { operationId: 'getPet' } } }).valid).toBe(true)
    })

    it('accepts callbacks map', () => {
      expect(validateComponentsObject({ callbacks: { onEvent: {} } }).valid).toBe(true)
    })

    it('accepts pathItems map', () => {
      expect(validateComponentsObject({ pathItems: { petPath: {} } }).valid).toBe(true)
    })
  })

  // --- Key Naming Constraints ---

  describe('key naming constraints', () => {
    it('accepts alphanumeric keys', () => {
      expect(validateComponentsObject({ schemas: { User1: { type: 'object' } } }).valid).toBe(true)
    })

    it('accepts keys with dots', () => {
      expect(validateComponentsObject({ schemas: { 'my.org.User': { type: 'object' } } }).valid).toBe(true)
    })

    it('accepts keys with hyphens', () => {
      expect(validateComponentsObject({ schemas: { 'user-name': { type: 'object' } } }).valid).toBe(true)
    })

    it('accepts keys with underscores', () => {
      expect(validateComponentsObject({ schemas: { User_Name: { type: 'object' } } }).valid).toBe(true)
    })

    it('rejects keys with spaces', () => {
      expect(validateComponentsObject({ schemas: { 'User Name': { type: 'object' } } }).valid).toBe(false)
    })

    it('rejects keys with special characters', () => {
      expect(validateComponentsObject({ schemas: { 'User@Name': { type: 'object' } } }).valid).toBe(false)
    })

    it('rejects keys with slashes', () => {
      expect(validateComponentsObject({ schemas: { 'User/Name': { type: 'object' } } }).valid).toBe(false)
    })

    it('rejects keys starting with #', () => {
      expect(validateComponentsObject({ schemas: { '#User': { type: 'object' } } }).valid).toBe(false)
    })

    it('rejects empty string key', () => {
      expect(validateComponentsObject({ schemas: { '': { type: 'object' } } }).valid).toBe(false)
    })
  })

  // --- Reference Objects in Maps ---

  describe('reference objects', () => {
    it('accepts Reference Objects in responses', () => {
      expect(validateComponentsObject({
        responses: { NotFound: { $ref: '#/components/responses/GenericNotFound' } },
      }).valid).toBe(true)
    })

    it('accepts Reference Objects in parameters', () => {
      expect(validateComponentsObject({
        parameters: { PetId: { $ref: '#/components/parameters/BasePetId' } },
      }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateComponentsObject({ 'x-internal': true }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateComponentsObject({ models: {} }).valid).toBe(false)
    })
  })
})

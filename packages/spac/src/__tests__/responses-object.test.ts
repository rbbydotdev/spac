import { describe, it, expect } from 'vitest'
import { validateResponsesObject } from '../validate'

describe('Responses Object (4.8.16)', () => {
  const valid = () => ({
    '200': { description: 'Successful response' },
  })

  // --- Structure ---

  describe('structure', () => {
    it('accepts object with at least one response code', () => {
      expect(validateResponsesObject(valid()).valid).toBe(true)
    })

    it('rejects empty object (must have at least one response code)', () => {
      expect(validateResponsesObject({}).valid).toBe(false)
    })
  })

  // --- HTTP Status Codes ---

  describe('HTTP status codes', () => {
    it('accepts standard status codes', () => {
      expect(validateResponsesObject({ '200': { description: 'OK' } }).valid).toBe(true)
    })

    it('accepts 201 status code', () => {
      expect(validateResponsesObject({ '201': { description: 'Created' } }).valid).toBe(true)
    })

    it('accepts 404 status code', () => {
      expect(validateResponsesObject({ '404': { description: 'Not Found' } }).valid).toBe(true)
    })

    it('accepts 500 status code', () => {
      expect(validateResponsesObject({ '500': { description: 'Server Error' } }).valid).toBe(true)
    })

    it('accepts wildcard status codes (1XX)', () => {
      expect(validateResponsesObject({ '1XX': { description: 'Informational' } }).valid).toBe(true)
    })

    it('accepts wildcard status codes (2XX)', () => {
      expect(validateResponsesObject({ '2XX': { description: 'Success' } }).valid).toBe(true)
    })

    it('accepts wildcard status codes (3XX)', () => {
      expect(validateResponsesObject({ '3XX': { description: 'Redirect' } }).valid).toBe(true)
    })

    it('accepts wildcard status codes (4XX)', () => {
      expect(validateResponsesObject({ '4XX': { description: 'Client Error' } }).valid).toBe(true)
    })

    it('accepts wildcard status codes (5XX)', () => {
      expect(validateResponsesObject({ '5XX': { description: 'Server Error' } }).valid).toBe(true)
    })

    it('accepts multiple status codes', () => {
      const responses = {
        '200': { description: 'OK' },
        '404': { description: 'Not Found' },
        '500': { description: 'Server Error' },
      }
      expect(validateResponsesObject(responses).valid).toBe(true)
    })

    it('accepts Reference Objects as response values', () => {
      expect(validateResponsesObject({
        '200': { $ref: '#/components/responses/Success' },
      }).valid).toBe(true)
    })
  })

  // --- Default Response ---

  describe('default response', () => {
    it('accepts default response', () => {
      const responses = {
        '200': { description: 'OK' },
        default: { description: 'Unexpected error' },
      }
      expect(validateResponsesObject(responses).valid).toBe(true)
    })

    it('accepts only default response as the single required response', () => {
      expect(validateResponsesObject({ default: { description: 'Default' } }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateResponsesObject({ ...valid(), 'x-default-error': true }).valid).toBe(true)
    })
  })
})

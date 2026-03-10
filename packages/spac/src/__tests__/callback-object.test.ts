import { describe, it, expect } from 'vitest'
import { validateCallbackObject } from '../validate'

describe('Callback Object (4.8.18)', () => {
  const valid = () => ({
    '{$request.body#/callbackUrl}': {
      post: {
        responses: { '200': { description: 'OK' } },
      },
    },
  })

  // --- Structure ---

  describe('structure', () => {
    it('accepts empty callback object', () => {
      expect(validateCallbackObject({}).valid).toBe(true)
    })

    it('accepts callback with runtime expression key', () => {
      expect(validateCallbackObject(valid()).valid).toBe(true)
    })
  })

  // --- Runtime Expression Keys ---

  describe('runtime expression keys', () => {
    it('accepts $url expression', () => {
      expect(validateCallbackObject({
        '{$url}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts $method expression', () => {
      expect(validateCallbackObject({
        '{$method}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts $statusCode expression', () => {
      expect(validateCallbackObject({
        '{$statusCode}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts $request.header expression', () => {
      expect(validateCallbackObject({
        '{$request.header.X-Callback}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts $request.body with JSON pointer', () => {
      expect(validateCallbackObject({
        '{$request.body#/callbackUrl}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts $response.body with JSON pointer', () => {
      expect(validateCallbackObject({
        '{$response.body#/webhookUrl}': { post: { responses: { '200': { description: 'OK' } } } },
      }).valid).toBe(true)
    })

    it('accepts multiple callback entries', () => {
      const callbacks = {
        '{$request.body#/onSuccess}': { post: { responses: { '200': { description: 'OK' } } } },
        '{$request.body#/onError}': { post: { responses: { '200': { description: 'OK' } } } },
      }
      expect(validateCallbackObject(callbacks).valid).toBe(true)
    })
  })

  // --- Path Item Object Values ---

  describe('values are Path Item Objects', () => {
    it('accepts Path Item Object with multiple methods', () => {
      expect(validateCallbackObject({
        '{$request.body#/url}': {
          get: { responses: { '200': { description: 'OK' } } },
          post: { responses: { '201': { description: 'Created' } } },
        },
      }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateCallbackObject({ ...valid(), 'x-callback-type': 'webhook' }).valid).toBe(true)
    })
  })
})

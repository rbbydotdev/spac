import { describe, it, expect } from 'vitest'
import { validatePathsObject } from '../validate'

describe('Paths Object (4.8.8)', () => {
  const valid = () => ({
    '/pets': {},
  })

  // --- Structure ---

  describe('structure', () => {
    it('accepts empty Paths Object', () => {
      expect(validatePathsObject({}).valid).toBe(true)
    })

    it('accepts valid path starting with /', () => {
      expect(validatePathsObject(valid()).valid).toBe(true)
    })

    it('accepts multiple paths', () => {
      const paths = {
        '/pets': {},
        '/pets/{petId}': {},
        '/users': {},
      }
      expect(validatePathsObject(paths).valid).toBe(true)
    })
  })

  // --- Path Constraints ---

  describe('path constraints', () => {
    it('rejects path not starting with /', () => {
      expect(validatePathsObject({ 'pets': {} }).valid).toBe(false)
    })

    it('accepts path with template variables', () => {
      expect(validatePathsObject({ '/pets/{petId}': {} }).valid).toBe(true)
    })

    it('accepts path with multiple template variables', () => {
      expect(validatePathsObject({ '/users/{userId}/pets/{petId}': {} }).valid).toBe(true)
    })

    it('rejects duplicate templated paths with different variable names', () => {
      const paths = {
        '/pets/{petId}': {},
        '/pets/{id}': {},
      }
      expect(validatePathsObject(paths).valid).toBe(false)
    })
  })

  // --- Path Item Values ---

  describe('path item values', () => {
    it('accepts Path Item Object as value', () => {
      const paths = {
        '/pets': {
          get: { responses: { '200': { description: 'OK' } } },
        },
      }
      expect(validatePathsObject(paths).valid).toBe(true)
    })

    it('accepts empty Path Item Object (ACL constraints)', () => {
      expect(validatePathsObject({ '/pets': {} }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validatePathsObject({ ...valid(), 'x-internal': true }).valid).toBe(true)
    })
  })
})

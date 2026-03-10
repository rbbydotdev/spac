import { describe, it, expect } from 'vitest'
import { validateServerVariableObject } from '../validate'

describe('Server Variable Object (4.8.6)', () => {
  const valid = () => ({
    default: 'production',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid server variable with default', () => {
      expect(validateServerVariableObject(valid()).valid).toBe(true)
    })

    it('rejects missing default', () => {
      expect(validateServerVariableObject({}).valid).toBe(false)
    })

    it('rejects default as a number', () => {
      expect(validateServerVariableObject({ default: 42 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts enum as an array of strings', () => {
      const sv = { ...valid(), enum: ['production', 'staging'] }
      expect(validateServerVariableObject(sv).valid).toBe(true)
    })

    it('accepts description as a string', () => {
      const sv = { ...valid(), description: 'The deployment environment' }
      expect(validateServerVariableObject(sv).valid).toBe(true)
    })
  })

  // --- Constraints ---

  describe('constraints', () => {
    it('rejects empty enum array', () => {
      const sv = { ...valid(), enum: [] }
      expect(validateServerVariableObject(sv).valid).toBe(false)
    })

    it('rejects default value not in enum when enum is defined', () => {
      const sv = { default: 'invalid', enum: ['production', 'staging'] }
      expect(validateServerVariableObject(sv).valid).toBe(false)
    })

    it('accepts default value that exists in enum', () => {
      const sv = { default: 'staging', enum: ['production', 'staging'] }
      expect(validateServerVariableObject(sv).valid).toBe(true)
    })

    it('rejects enum containing non-string values', () => {
      const sv = { default: '1', enum: [1, 2, 3] }
      expect(validateServerVariableObject(sv).valid).toBe(false)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateServerVariableObject({ ...valid(), 'x-env-var': 'NODE_ENV' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateServerVariableObject({ ...valid(), name: 'env' }).valid).toBe(false)
    })
  })
})

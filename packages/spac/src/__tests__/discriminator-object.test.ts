import { describe, it, expect } from 'vitest'
import { validateDiscriminatorObject } from '../validate'

describe('Discriminator Object (4.8.25)', () => {
  const valid = () => ({
    propertyName: 'petType',
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid discriminator with propertyName', () => {
      expect(validateDiscriminatorObject(valid()).valid).toBe(true)
    })

    it('rejects missing propertyName', () => {
      expect(validateDiscriminatorObject({}).valid).toBe(false)
    })

    it('rejects propertyName as a number', () => {
      expect(validateDiscriminatorObject({ propertyName: 42 }).valid).toBe(false)
    })
  })

  // --- Optional Fields ---

  describe('optional fields', () => {
    it('accepts mapping as a map of string to string', () => {
      expect(validateDiscriminatorObject({
        ...valid(),
        mapping: {
          cat: '#/components/schemas/Cat',
          dog: '#/components/schemas/Dog',
        },
      }).valid).toBe(true)
    })

    it('accepts mapping with component names', () => {
      expect(validateDiscriminatorObject({
        ...valid(),
        mapping: { cat: 'Cat', dog: 'Dog' },
      }).valid).toBe(true)
    })

    it('accepts mapping with URI references', () => {
      expect(validateDiscriminatorObject({
        ...valid(),
        mapping: {
          cat: './schemas/Cat.json',
          dog: 'https://example.com/schemas/Dog.json',
        },
      }).valid).toBe(true)
    })

    it('rejects mapping values as numbers', () => {
      expect(validateDiscriminatorObject({
        ...valid(),
        mapping: { cat: 42 },
      }).valid).toBe(false)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateDiscriminatorObject({ ...valid(), 'x-enum': true }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateDiscriminatorObject({ ...valid(), enumValues: [] }).valid).toBe(false)
    })
  })
})

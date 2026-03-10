import { describe, it, expect } from 'vitest'
import { validateParameterObject } from '../validate'

describe('Parameter Object (4.8.12)', () => {
  const valid = () => ({
    name: 'petId',
    in: 'path',
    required: true,
    schema: { type: 'string' },
  })

  // --- Required Fields ---

  describe('required fields', () => {
    it('accepts minimal valid parameter with name, in, and schema', () => {
      expect(validateParameterObject(valid()).valid).toBe(true)
    })

    it('rejects missing name', () => {
      const { name, ...rest } = valid()
      expect(validateParameterObject(rest).valid).toBe(false)
    })

    it('rejects missing in', () => {
      const { in: _in, ...rest } = valid()
      expect(validateParameterObject(rest).valid).toBe(false)
    })

    it('rejects name as a number', () => {
      expect(validateParameterObject({ ...valid(), name: 42 }).valid).toBe(false)
    })

    it('rejects in as a number', () => {
      expect(validateParameterObject({ ...valid(), in: 42 }).valid).toBe(false)
    })
  })

  // --- "in" Field Values ---

  describe('in field values', () => {
    it('accepts in: "path"', () => {
      expect(validateParameterObject({ name: 'id', in: 'path', required: true, schema: { type: 'string' } }).valid).toBe(true)
    })

    it('accepts in: "query"', () => {
      expect(validateParameterObject({ name: 'limit', in: 'query', schema: { type: 'integer' } }).valid).toBe(true)
    })

    it('accepts in: "header"', () => {
      expect(validateParameterObject({ name: 'X-Request-Id', in: 'header', schema: { type: 'string' } }).valid).toBe(true)
    })

    it('accepts in: "cookie"', () => {
      expect(validateParameterObject({ name: 'session', in: 'cookie', schema: { type: 'string' } }).valid).toBe(true)
    })

    it('rejects invalid in value', () => {
      expect(validateParameterObject({ name: 'id', in: 'body', schema: { type: 'string' } }).valid).toBe(false)
    })
  })

  // --- Path Parameters ---

  describe('path parameters', () => {
    it('requires required: true when in is "path"', () => {
      expect(validateParameterObject({ name: 'id', in: 'path', schema: { type: 'string' } }).valid).toBe(false)
    })

    it('rejects required: false when in is "path"', () => {
      expect(validateParameterObject({ name: 'id', in: 'path', required: false, schema: { type: 'string' } }).valid).toBe(false)
    })

    it('accepts required: true when in is "path"', () => {
      expect(validateParameterObject({ name: 'id', in: 'path', required: true, schema: { type: 'string' } }).valid).toBe(true)
    })
  })

  // --- schema vs content ---

  describe('schema vs content mutual exclusivity', () => {
    it('accepts parameter with schema', () => {
      expect(validateParameterObject({ name: 'id', in: 'query', schema: { type: 'string' } }).valid).toBe(true)
    })

    it('accepts parameter with content', () => {
      expect(validateParameterObject({
        name: 'coordinates',
        in: 'query',
        content: { 'application/json': { schema: { type: 'object' } } },
      }).valid).toBe(true)
    })

    it('rejects parameter with both schema and content', () => {
      expect(validateParameterObject({
        name: 'id',
        in: 'query',
        schema: { type: 'string' },
        content: { 'application/json': {} },
      }).valid).toBe(false)
    })

    it('rejects parameter with neither schema nor content', () => {
      expect(validateParameterObject({ name: 'id', in: 'query' }).valid).toBe(false)
    })

    it('rejects content map with more than one entry', () => {
      expect(validateParameterObject({
        name: 'id',
        in: 'query',
        content: {
          'application/json': {},
          'application/xml': {},
        },
      }).valid).toBe(false)
    })

    it('accepts content map with exactly one entry', () => {
      expect(validateParameterObject({
        name: 'id',
        in: 'query',
        content: { 'application/json': { schema: { type: 'string' } } },
      }).valid).toBe(true)
    })
  })

  // --- example vs examples ---

  describe('example vs examples mutual exclusivity', () => {
    it('accepts example', () => {
      expect(validateParameterObject({ ...valid(), example: 'abc123' }).valid).toBe(true)
    })

    it('accepts examples', () => {
      expect(validateParameterObject({
        ...valid(),
        examples: { one: { value: 'abc123' } },
      }).valid).toBe(true)
    })

    it('rejects both example and examples', () => {
      expect(validateParameterObject({
        ...valid(),
        example: 'abc123',
        examples: { one: { value: 'abc123' } },
      }).valid).toBe(false)
    })
  })

  // --- Style Fields ---

  describe('style values', () => {
    it('accepts style: "simple" for path parameters', () => {
      expect(validateParameterObject({ ...valid(), style: 'simple' }).valid).toBe(true)
    })

    it('accepts style: "label" for path parameters', () => {
      expect(validateParameterObject({ ...valid(), style: 'label' }).valid).toBe(true)
    })

    it('accepts style: "matrix" for path parameters', () => {
      expect(validateParameterObject({ ...valid(), style: 'matrix' }).valid).toBe(true)
    })

    it('accepts style: "form" for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'string' }, style: 'form' }).valid).toBe(true)
    })

    it('accepts style: "spaceDelimited" for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'array' }, style: 'spaceDelimited' }).valid).toBe(true)
    })

    it('accepts style: "pipeDelimited" for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'array' }, style: 'pipeDelimited' }).valid).toBe(true)
    })

    it('accepts style: "deepObject" for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'object' }, style: 'deepObject' }).valid).toBe(true)
    })

    it('rejects style: "form" for path parameters', () => {
      expect(validateParameterObject({ ...valid(), style: 'form' }).valid).toBe(false)
    })

    it('rejects style: "deepObject" for path parameters', () => {
      expect(validateParameterObject({ ...valid(), style: 'deepObject' }).valid).toBe(false)
    })

    it('rejects invalid style value', () => {
      expect(validateParameterObject({ ...valid(), style: 'invalid' }).valid).toBe(false)
    })
  })

  // --- Optional Common Fields ---

  describe('optional common fields', () => {
    it('accepts description', () => {
      expect(validateParameterObject({ ...valid(), description: 'The pet ID' }).valid).toBe(true)
    })

    it('accepts required as boolean (non-path)', () => {
      expect(validateParameterObject({ name: 'limit', in: 'query', schema: { type: 'integer' }, required: false }).valid).toBe(true)
    })

    it('accepts deprecated as boolean', () => {
      expect(validateParameterObject({ ...valid(), deprecated: true }).valid).toBe(true)
    })

    it('accepts allowEmptyValue for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'string' }, allowEmptyValue: true }).valid).toBe(true)
    })

    it('accepts explode as boolean', () => {
      expect(validateParameterObject({ ...valid(), explode: true }).valid).toBe(true)
    })

    it('accepts allowReserved for query parameters', () => {
      expect(validateParameterObject({ name: 'q', in: 'query', schema: { type: 'string' }, allowReserved: true }).valid).toBe(true)
    })
  })

  // --- Specification Extensions ---

  describe('specification extensions', () => {
    it('allows x- prefixed extension fields', () => {
      expect(validateParameterObject({ ...valid(), 'x-example': 'test' }).valid).toBe(true)
    })

    it('rejects unknown fields without x- prefix', () => {
      expect(validateParameterObject({ ...valid(), format: 'uuid' }).valid).toBe(false)
    })
  })
})

import { describe, it, expect } from 'vitest'
import { serializeJsonWithPositions } from '../debug'

describe('serializeJsonWithPositions', () => {
  it('serializes simple object', () => {
    const { json, positions } = serializeJsonWithPositions({ a: 1, b: 'hello' })
    expect(JSON.parse(json)).toEqual({ a: 1, b: 'hello' })
    expect(positions.has('["a"]')).toBe(true)
    expect(positions.has('["b"]')).toBe(true)
  })

  it('records root position', () => {
    const { positions } = serializeJsonWithPositions({ x: 1 })
    expect(positions.has('')).toBe(true)
    expect(positions.get('')).toEqual({ line: 0, col: 0 })
  })

  it('tracks nested object positions', () => {
    const { json, positions } = serializeJsonWithPositions({
      paths: {
        '/pets': {
          get: { summary: 'List pets' },
        },
      },
    })
    expect(JSON.parse(json)).toEqual({
      paths: { '/pets': { get: { summary: 'List pets' } } },
    })

    expect(positions.has('["paths"]')).toBe(true)
    expect(positions.has('["paths"]["/pets"]')).toBe(true)
    expect(positions.has('["paths"]["/pets"]["get"]')).toBe(true)
    expect(positions.has('["paths"]["/pets"]["get"]["summary"]')).toBe(true)
  })

  it('tracks array element positions', () => {
    const { json, positions } = serializeJsonWithPositions({
      tags: ['pets', 'store'],
    })
    expect(JSON.parse(json)).toEqual({ tags: ['pets', 'store'] })
    expect(positions.has('["tags"][0]')).toBe(true)
    expect(positions.has('["tags"][1]')).toBe(true)
  })

  it('handles empty objects and arrays', () => {
    const { json } = serializeJsonWithPositions({ empty: {}, arr: [] })
    expect(JSON.parse(json)).toEqual({ empty: {}, arr: [] })
  })

  it('handles null and boolean values', () => {
    const { json } = serializeJsonWithPositions({ n: null, b: true, f: false })
    expect(JSON.parse(json)).toEqual({ n: null, b: true, f: false })
  })

  it('position line/col are 0-based', () => {
    const { positions } = serializeJsonWithPositions({ a: 1 })
    const pos = positions.get('["a"]')
    expect(pos).toBeDefined()
    expect(pos!.line).toBeGreaterThanOrEqual(0)
    expect(pos!.col).toBeGreaterThanOrEqual(0)
  })
})

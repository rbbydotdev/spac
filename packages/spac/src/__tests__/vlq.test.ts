import { describe, it, expect } from 'vitest'
import { vlqEncode } from '../debug'

describe('VLQ encoding', () => {
  it('encodes 0', () => {
    expect(vlqEncode(0)).toBe('A')
  })

  it('encodes positive values', () => {
    expect(vlqEncode(1)).toBe('C')
    expect(vlqEncode(2)).toBe('E')
    expect(vlqEncode(15)).toBe('e')
  })

  it('encodes negative values', () => {
    expect(vlqEncode(-1)).toBe('D')
    expect(vlqEncode(-2)).toBe('F')
  })

  it('encodes multi-character values', () => {
    expect(vlqEncode(16)).toBe('gB')
  })

  it('encodes large values', () => {
    const result = vlqEncode(1000)
    expect(result.length).toBeGreaterThan(1)
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/)
  })
})

import { describe, it, expect } from 'vitest'
import { vlqEncode } from '../vlq.js'

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
    // 16 requires continuation: 16 << 1 = 32, which is 100000 in binary
    // First digit: 00000 | 100000 = 100000 = 'g', continuation
    // Second digit: 00001 = 'B'
    expect(vlqEncode(16)).toBe('gB')
  })

  it('encodes large values', () => {
    const result = vlqEncode(1000)
    expect(result.length).toBeGreaterThan(1)
    // Just verify it produces a valid Base64 string
    expect(result).toMatch(/^[A-Za-z0-9+/]+$/)
  })
})

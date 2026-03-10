import { describe, it, expect } from 'vitest'
import {
  findCommonPrefix,
  stripPrefix,
  extractPathParams,
  groupByPath,
  applyStripPrefixes,
  firstSegment,
} from '../organize'
import type { ParsedOperation } from '../types'

describe('findCommonPrefix', () => {
  it('returns empty for no paths', () => {
    expect(findCommonPrefix([])).toBe('')
  })

  it('returns the path for single path', () => {
    expect(findCommonPrefix(['/pets'])).toBe('/pets')
  })

  it('finds common prefix', () => {
    expect(findCommonPrefix(['/pets', '/pets/123'])).toBe('/pets')
  })

  it('handles path params in prefix', () => {
    expect(findCommonPrefix([
      '/zones/{zone_id}/dns_records',
      '/zones/{zone_id}/dns_records/export',
    ])).toBe('/zones/{zone_id}/dns_records')
  })

  it('returns empty when no common prefix', () => {
    expect(findCommonPrefix(['/pets', '/users'])).toBe('')
  })
})

describe('stripPrefix', () => {
  it('strips prefix from path', () => {
    expect(stripPrefix('/pets/123', '/pets')).toBe('/123')
  })

  it('returns / when path equals prefix', () => {
    expect(stripPrefix('/pets', '/pets')).toBe('/')
  })
})

describe('extractPathParams', () => {
  it('extracts params from curly braces', () => {
    expect(extractPathParams('/zones/{zone_id}/dns/{record_id}'))
      .toEqual(['zone_id', 'record_id'])
  })

  it('returns empty for no params', () => {
    expect(extractPathParams('/pets')).toEqual([])
  })
})

describe('applyStripPrefixes', () => {
  const prefixes = ['/accounts/{account_id}', '/zones/{zone_id}']

  it('strips matching prefix', () => {
    expect(applyStripPrefixes('/accounts/{account_id}/access/apps', prefixes))
      .toBe('/access/apps')
  })

  it('returns empty for exact match', () => {
    expect(applyStripPrefixes('/accounts/{account_id}', prefixes))
      .toBe('')
  })

  it('returns original if no match', () => {
    expect(applyStripPrefixes('/user/tokens', prefixes))
      .toBe('/user/tokens')
  })

  it('does not strip partial segment match', () => {
    expect(applyStripPrefixes('/accounts/move', prefixes))
      .toBe('/accounts/move')
  })
})

describe('firstSegment', () => {
  it('extracts first segment', () => {
    expect(firstSegment('/access/apps')).toBe('access')
  })

  it('handles single segment', () => {
    expect(firstSegment('/user')).toBe('user')
  })

  it('returns "other" for empty', () => {
    expect(firstSegment('')).toBe('other')
  })
})

describe('groupByPath', () => {
  const makeOp = (path: string, method = 'get'): ParsedOperation => ({
    path,
    method,
    tags: [],
    pathParams: [],
    queryParams: [],
    headerParams: [],
    responses: new Map(),
    extensions: {},
  })

  it('groups by first path segment', () => {
    const ops = [
      makeOp('/pets'),
      makeOp('/pets/{id}'),
      makeOp('/users'),
    ]
    const groups = groupByPath(ops)
    expect(groups).toHaveLength(2)
    expect(groups.map(g => g.slug).sort()).toEqual(['pets', 'users'])
    expect(groups.find(g => g.slug === 'pets')!.operations).toHaveLength(2)
  })

  it('applies strip prefixes', () => {
    const ops = [
      makeOp('/accounts/{account_id}/access/apps'),
      makeOp('/accounts/{account_id}/access/keys'),
      makeOp('/accounts/{account_id}/builds'),
      makeOp('/accounts'),
    ]
    const groups = groupByPath(ops, ['/accounts/{account_id}'])
    const slugs = groups.map(g => g.slug).sort()
    expect(slugs).toEqual(['access', 'accounts', 'builds'])
    expect(groups.find(g => g.slug === 'access')!.operations).toHaveLength(2)
  })

  it('generates correct registerFn', () => {
    const ops = [makeOp('/dns_records')]
    const groups = groupByPath(ops)
    expect(groups[0].registerFn).toBe('registerDnsRecords')
  })
})

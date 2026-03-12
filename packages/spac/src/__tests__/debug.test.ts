import { describe, it, expect } from 'vitest'
import { Type } from '@sinclair/typebox'
import {
  Api,
  named,
  lookup,
  crc32,
  objectPath,
  errorSchema,
  noContent,
  macro,
} from '../index'

// ---------------------------------------------------------------------------
// Shared test schemas
// ---------------------------------------------------------------------------

const Pet = named(
  'Pet',
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
  }),
)

const Error = errorSchema()

const authenticated = macro.route((r) =>
  r.security('bearerAuth').error(401, Error).error(403, Error),
)

function buildDebugApi() {
  const api = new Api('DebugTest', { version: '1.0.0' })

  api.securityScheme('bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  })

  api.tag({ name: 'pets', description: 'Pet operations' })

  api.group('/pets', (g) => {
    g.tag('pets')

    g.get('/', {
      response: Type.Array(Pet),
    })
      .summary('List all pets')
      .operationId('listPets')

    g.get('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      response: Pet,
    })
      .summary('Get a pet by ID')
      .operationId('getPet')
      .error(404, Error)

    g.delete('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      responses: { 204: noContent() },
    })
      .summary('Delete a pet')
      .operationId('deletePet')
      .use(authenticated)
      .error(404, Error)
  })

  return api.emit({ debug: true })
}

// ===========================================================================
// crc32
// ===========================================================================

describe('crc32', () => {
  it('returns 8-char hex string', () => {
    const hash = crc32('hello')
    expect(hash).toMatch(/^[0-9a-f]{8}$/)
  })

  it('is deterministic', () => {
    expect(crc32('test')).toBe(crc32('test'))
  })

  it('produces different hashes for different inputs', () => {
    expect(crc32('foo')).not.toBe(crc32('bar'))
  })
})

// ===========================================================================
// objectPath
// ===========================================================================

describe('objectPath', () => {
  it('builds bracket notation from string segments', () => {
    expect(objectPath('paths', '/pets', 'get')).toBe('["paths"]["/pets"]["get"]')
  })

  it('handles numeric segments', () => {
    expect(objectPath('tags', 0)).toBe('["tags"][0]')
  })

  it('handles single segment', () => {
    expect(objectPath('info')).toBe('["info"]')
  })
})

// ===========================================================================
// lookup
// ===========================================================================

describe('lookup', () => {
  it('finds source for a top-level path (info)', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'info')
    expect(result).toBeDefined()
    expect(result!.path).toBe('["info"]')
    expect(result!.src).toMatch(/:\d+:\d+$/)
  })

  it('finds source for an operation', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'paths', '/pets', 'get')
    expect(result).toBeDefined()
    expect(result!.src).toMatch(/:\d+:\d+$/)
  })

  it('finds source for operation metadata (summary)', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'paths', '/pets', 'get', 'summary')
    expect(result).toBeDefined()
    expect(result!.src).toMatch(/:\d+:\d+$/)
  })

  it('walks up the tree for unmapped child paths', () => {
    const debug = buildDebugApi()
    // "parameters" likely has no direct entry, should walk up to the operation
    const result = lookup(debug, 'paths', '/pets', 'get', 'parameters')
    expect(result).toBeDefined()
    // The matched path should be an ancestor
    expect(result!.path.length).toBeLessThanOrEqual(
      objectPath('paths', '/pets', 'get', 'parameters').length,
    )
  })

  it('finds source for a delete response', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'paths', '/pets/:petId', 'delete', 'responses', '204')
    expect(result).toBeDefined()
    expect(result!.src).toMatch(/:\d+:\d+$/)
  })

  it('finds source for security schemes', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'components', 'securitySchemes', 'bearerAuth')
    expect(result).toBeDefined()
    expect(result!.src).toMatch(/:\d+:\d+$/)
  })

  it('finds source for tags', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'tags', 0)
    expect(result).toBeDefined()
  })

  it('returns undefined for completely unknown paths', () => {
    const debug = buildDebugApi()
    const result = lookup(debug, 'nonexistent')
    expect(result).toBeUndefined()
  })
})

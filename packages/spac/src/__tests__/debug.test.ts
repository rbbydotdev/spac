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

// ===========================================================================
// V3 source map
// ===========================================================================

describe('V3 source map', () => {
  it('includes v3 field in debug output', () => {
    const debug = buildDebugApi()
    expect(debug.v3).toBeDefined()
    expect(debug.v3.version).toBe(3)
    expect(debug.v3.file).toBe('spec.json')
  })

  it('includes source files in v3 sources array', () => {
    const debug = buildDebugApi()
    expect(debug.v3.sources.length).toBeGreaterThan(0)
  })

  it('has non-empty VLQ mappings string', () => {
    const debug = buildDebugApi()
    expect(typeof debug.v3.mappings).toBe('string')
    expect(debug.v3.mappings.length).toBeGreaterThan(0)
  })

  it('includes formatted JSON output', () => {
    const debug = buildDebugApi()
    expect(debug.json).toBeDefined()
    const parsed = JSON.parse(debug.json)
    expect(parsed.openapi).toBe('3.1.0')
    expect(parsed.info.title).toBe('DebugTest')
  })

  it('JSON output matches spec', () => {
    const debug = buildDebugApi()
    expect(JSON.parse(debug.json)).toEqual(debug.spec)
  })
})

// ===========================================================================
// _src (compile-time source injection)
// ===========================================================================

describe('_src compile-time injection', () => {
  it('Api._src overrides runtime-captured info source', () => {
    const api = new Api('Test')
    api._src('info', ['/injected.ts', 10, 5])
    const debug = api.emit({ debug: true })
    expect(debug.files).toContain('/injected.ts')
  })

  it('RouteBuilder._src sets chain method source', () => {
    const api = new Api('Test')
    api.get('/test', { response: Type.String() })
      ._src('summary', ['/injected.ts', 20, 3])
      .summary('Test')
    const debug = api.emit({ debug: true })
    expect(debug.files).toContain('/injected.ts')
  })

  it('config __src sets per-property sources', () => {
    const api = new Api('Test')
    api.get('/test', {
      response: Type.String(),
      __src: {
        __file: '/injected.ts',
        __call: [5, 1],
        response: [6, 3],
      },
    } as any)
    const debug = api.emit({ debug: true })
    expect(debug.files).toContain('/injected.ts')
    // Should have separate entries for the operation and the response
    expect(Object.keys(debug.sourceMap).length).toBeGreaterThanOrEqual(2)
  })
})

// ===========================================================================
// End-to-end source map accuracy
// ===========================================================================

describe('source map round-trip accuracy', () => {
  it('_src injected positions round-trip through lookup with correct file:line:col', () => {
    const api = new Api('Test')
    api._src('info', ['/src/api.ts', 10, 5])
    api._src('__server', ['/src/api.ts', 12, 1])
    api.server({ url: 'https://example.com' })
    api._src('securityScheme:bearer', ['/src/api.ts', 14, 1])
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer' })

    api.get('/test', {
      response: Type.String(),
      __src: {
        __file: '/src/routes.ts',
        __call: [20, 3],
        response: [21, 5],
      },
    } as any)
      ._src('summary', ['/src/routes.ts', 22, 5])
      .summary('Test operation')
      ._src('tags', ['/src/routes.ts', 23, 5])
      .tag('testing')

    const debug = api.emit({ debug: true })

    // info → /src/api.ts:10:5
    const infoResult = lookup(debug, 'info')
    expect(infoResult).toBeDefined()
    expect(infoResult!.src).toBe('/src/api.ts:10:5')

    // servers[0] → /src/api.ts:12:1
    const serverResult = lookup(debug, 'servers', 0)
    expect(serverResult).toBeDefined()
    expect(serverResult!.src).toBe('/src/api.ts:12:1')

    // securitySchemes → /src/api.ts:14:1
    const secResult = lookup(debug, 'components', 'securitySchemes', 'bearer')
    expect(secResult).toBeDefined()
    expect(secResult!.src).toBe('/src/api.ts:14:1')

    // operation → /src/routes.ts:20:3
    const opResult = lookup(debug, 'paths', '/test', 'get')
    expect(opResult).toBeDefined()
    expect(opResult!.src).toBe('/src/routes.ts:20:3')

    // response 200 → /src/routes.ts:21:5 (per-property from __src)
    const respResult = lookup(debug, 'paths', '/test', 'get', 'responses', '200')
    expect(respResult).toBeDefined()
    expect(respResult!.src).toBe('/src/routes.ts:21:5')

    // summary → /src/routes.ts:22:5
    const sumResult = lookup(debug, 'paths', '/test', 'get', 'summary')
    expect(sumResult).toBeDefined()
    expect(sumResult!.src).toBe('/src/routes.ts:22:5')

    // tags → /src/routes.ts:23:5
    const tagResult = lookup(debug, 'paths', '/test', 'get', 'tags')
    expect(tagResult).toBeDefined()
    expect(tagResult!.src).toBe('/src/routes.ts:23:5')
  })

  it('per-property __src gives finer granularity than runtime capture', () => {
    // With __src: params and response get different positions
    const api1 = new Api('WithSrc')
    api1.get('/test', {
      params: Type.Object({ id: Type.String() }),
      response: Type.String(),
      __src: {
        __file: '/src/test.ts',
        __call: [10, 1],
        params: [11, 3],
        response: [12, 3],
      },
    } as any)
    const d1 = api1.emit({ debug: true })

    // Without __src: params and response share the operation call site
    const api2 = new Api('WithoutSrc')
    api2.get('/test2', {
      params: Type.Object({ id: Type.String() }),
      response: Type.String(),
    } as any)
    const d2 = api2.emit({ debug: true })

    // With __src: operation and response should have different source positions
    const op1 = lookup(d1, 'paths', '/test', 'get')
    const resp1 = lookup(d1, 'paths', '/test', 'get', 'responses', '200')
    expect(op1).toBeDefined()
    expect(resp1).toBeDefined()
    expect(op1!.src).not.toBe(resp1!.src) // Different positions!

    // Without __src: operation and response share the same call-site
    const op2 = lookup(d2, 'paths', '/test2', 'get')
    const resp2 = lookup(d2, 'paths', '/test2', 'get', 'responses', '200')
    expect(op2).toBeDefined()
    expect(resp2).toBeDefined()
    expect(op2!.src).toBe(resp2!.src) // Same position (runtime capture)
  })

  it('V3 source map entries correspond to legacy CRC32 entries', () => {
    const api = new Api('Test')
    api._src('info', ['/src/test.ts', 1, 1])
    api.get('/pets', {
      response: Type.Array(Type.String()),
      __src: {
        __file: '/src/test.ts',
        __call: [5, 1],
        response: [6, 3],
      },
    } as any)
      ._src('summary', ['/src/test.ts', 7, 3])
      .summary('List')

    const debug = api.emit({ debug: true })

    // V3 map should reference the same source file
    expect(debug.v3.sources).toContain('/src/test.ts')

    // V3 mappings should be non-empty
    const lines = debug.v3.mappings.split(';')
    const nonEmpty = lines.filter(l => l.length > 0)
    expect(nonEmpty.length).toBeGreaterThan(0)

    // The number of V3 mapped lines should cover the spec output
    const jsonLines = debug.json.split('\n')
    expect(lines.length).toBeLessThanOrEqual(jsonLines.length)
  })

  it('multi-file sources are tracked correctly', () => {
    const api = new Api('MultiFile')
    api._src('info', ['/src/main.ts', 1, 1])
    api._src('__server', ['/src/config.ts', 5, 1])
    api.server({ url: 'https://example.com' })

    api.get('/test', {
      response: Type.String(),
      __src: {
        __file: '/src/routes.ts',
        __call: [10, 1],
        response: [11, 3],
      },
    } as any)
      ._src('summary', ['/src/routes.ts', 12, 3])
      .summary('Test')

    const debug = api.emit({ debug: true })

    // All three files should appear
    expect(debug.files).toContain('/src/main.ts')
    expect(debug.files).toContain('/src/config.ts')
    expect(debug.files).toContain('/src/routes.ts')

    // V3 map should also reference all source files
    expect(debug.v3.sources).toContain('/src/main.ts')
    expect(debug.v3.sources).toContain('/src/config.ts')
    expect(debug.v3.sources).toContain('/src/routes.ts')

    // Verify lookups resolve to the correct files
    const info = lookup(debug, 'info')
    expect(info!.src.startsWith('/src/main.ts:')).toBe(true)

    const server = lookup(debug, 'servers', 0)
    expect(server!.src.startsWith('/src/config.ts:')).toBe(true)

    const op = lookup(debug, 'paths', '/test', 'get')
    expect(op!.src.startsWith('/src/routes.ts:')).toBe(true)
  })

  it('staged source keys (__server, __tag, __security) are consumed correctly', () => {
    const api = new Api('Staged')
    api._src('info', ['/src/api.ts', 1, 1])

    // Two servers — each should get its own source entry
    api._src('__server', ['/src/api.ts', 3, 1])
    api.server({ url: 'https://prod.example.com' })
    api._src('__server', ['/src/api.ts', 4, 1])
    api.server({ url: 'https://staging.example.com' })

    // Two tags
    api._src('__tag', ['/src/api.ts', 6, 1])
    api.tag('pets')
    api._src('__tag', ['/src/api.ts', 7, 1])
    api.tag('store')

    const debug = api.emit({ debug: true })

    const s0 = lookup(debug, 'servers', 0)
    expect(s0!.src).toBe('/src/api.ts:3:1')

    const s1 = lookup(debug, 'servers', 1)
    expect(s1!.src).toBe('/src/api.ts:4:1')

    const t0 = lookup(debug, 'tags', 0)
    expect(t0!.src).toBe('/src/api.ts:6:1')

    const t1 = lookup(debug, 'tags', 1)
    expect(t1!.src).toBe('/src/api.ts:7:1')
  })
})

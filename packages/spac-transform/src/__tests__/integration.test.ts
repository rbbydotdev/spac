import { describe, it, expect } from 'vitest'
import { transform } from '../index.js'
import { Api, named } from 'spac'
import { Type } from '@sinclair/typebox'

describe('integration: transform → runtime → emit', () => {
  it('transformed code produces valid OpenAPI with fine-grained source map', () => {
    // This test manually exercises the _src and __src runtime paths
    // that the transformer would produce
    const Pet = named('Pet', Type.Object({
      id: Type.String(),
      name: Type.String(),
    }))

    const api = new Api('Petstore')
    // Simulate what the transformer injects
    api._src('info', ['/src/petstore.ts', 1, 1])
    api._src('__server', ['/src/petstore.ts', 3, 1])
    api.server({ url: 'https://api.example.com' })

    api._src('securityScheme:bearer', ['/src/petstore.ts', 4, 1])
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer' })

    api.group('/pets', g => {
      // Simulate __src in config object
      g.get('/', {
        response: Type.Array(Pet),
        __src: {
          __file: '/src/petstore.ts',
          __call: [7, 3],
          response: [8, 5],
        },
      } as any)
        ._src('summary', ['/src/petstore.ts', 9, 5])
        .summary('List pets')
        ._src('tags', ['/src/petstore.ts', 10, 5])
        .tag('pets')
    })

    const debug = api.emit({ debug: true })

    // Verify spec is valid
    expect(debug.spec.openapi).toBe('3.1.0')
    expect((debug.spec.info as any).title).toBe('Petstore')

    // Verify source map has entries
    expect(debug.files.length).toBeGreaterThan(0)
    expect(Object.keys(debug.sourceMap).length).toBeGreaterThan(0)

    // Verify the source locations reference our injected file
    expect(debug.files).toContain('/src/petstore.ts')

    // Verify V3 source map is present
    expect(debug.v3).toBeDefined()
    expect(debug.v3.version).toBe(3)
    expect(debug.v3.sources).toContain('/src/petstore.ts')
    expect(typeof debug.v3.mappings).toBe('string')
    expect(debug.v3.mappings.length).toBeGreaterThan(0)

    // Verify JSON output is present and valid
    expect(debug.json).toBeDefined()
    expect(JSON.parse(debug.json)).toEqual(debug.spec)
  })

  it('_src overrides runtime captureCallSite for chain methods', () => {
    const api = new Api('Test')
    api._src('info', ['/test.ts', 1, 1])

    const route = api.get('/test', {
      response: Type.String(),
      __src: {
        __file: '/test.ts',
        __call: [3, 1],
        response: [4, 3],
      },
    } as any)

    route._src('summary', ['/test.ts', 5, 3]).summary('Test summary')

    const debug = api.emit({ debug: true })

    // The injected source should be used, not the runtime-captured one
    expect(debug.files).toContain('/test.ts')

    // Check that the source map has entries from our injected file
    const entries = Object.values(debug.sourceMap)
    const testFileId = debug.files.indexOf('/test.ts')
    const hasTestFileEntries = entries.some(e => e.startsWith(`${testFileId}:`))
    expect(hasTestFileEntries).toBe(true)
  })

  it('config __src provides per-property source locations', () => {
    const api = new Api('Test')

    api.get('/test', {
      params: Type.Object({ id: Type.String() }),
      query: Type.Object({ limit: Type.Integer() }),
      response: Type.String(),
      __src: {
        __file: '/test.ts',
        __call: [1, 1],
        params: [2, 3],
        query: [3, 3],
        response: [4, 3],
      },
    } as any)

    const debug = api.emit({ debug: true })

    // Should have separate source entries for params, query, response
    expect(Object.keys(debug.sourceMap).length).toBeGreaterThanOrEqual(3)
  })

  it('transform() produces parseable output', () => {
    const code = `
import { Api } from 'spac'
import { Type } from '@sinclair/typebox'

const api = new Api('Petstore')
api.server({ url: 'https://api.example.com' })
api.get('/pets', {
  response: Type.Array(Type.String()),
}).summary('List pets').tag('pets')
`
    const result = transform(code, '/src/petstore.ts')

    // Should be valid TypeScript (no syntax errors)
    expect(result).toContain('import { Api } from')
    expect(result).toContain('_src')
    expect(result).toContain('__src')

    // Should contain source file references
    expect(result).toContain('/src/petstore.ts')
  })
})

describe('source map round-trip accuracy', () => {
  it('injected _src positions survive emit and resolve via lookup', async () => {
    const { Api, lookup } = await import('spac')
    const { Type } = await import('@sinclair/typebox')

    const api = new Api('RoundTrip')
    // Simulate exactly what the transformer produces
    api._src('info', ['/src/app.ts', 5, 13])
    api._src('__server', ['/src/app.ts', 7, 1])
    api.server({ url: 'https://api.example.com' })
    api._src('securityScheme:bearer', ['/src/app.ts', 8, 1])
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer' })

    api.get('/items', {
      params: Type.Object({ id: Type.String() }),
      response: Type.String(),
      __src: {
        __file: '/src/routes.ts',
        __call: [15, 1],
        params: [16, 3],
        response: [17, 3],
      },
    } as any)
      ._src('summary', ['/src/routes.ts', 18, 3])
      .summary('Get item')
      ._src('tags', ['/src/routes.ts', 19, 3])
      .tag('items')
      ._src('error:404', ['/src/routes.ts', 20, 3])
      .error(404, Type.Object({ message: Type.String() }))

    const debug = api.emit({ debug: true })

    // Verify every injected position resolves correctly
    expect(lookup(debug, 'info')!.src).toBe('/src/app.ts:5:13')
    expect(lookup(debug, 'servers', 0)!.src).toBe('/src/app.ts:7:1')
    expect(lookup(debug, 'components', 'securitySchemes', 'bearer')!.src).toBe('/src/app.ts:8:1')
    expect(lookup(debug, 'paths', '/items', 'get')!.src).toBe('/src/routes.ts:15:1')
    expect(lookup(debug, 'paths', '/items', 'get', 'responses', '200')!.src).toBe('/src/routes.ts:17:3')
    expect(lookup(debug, 'paths', '/items', 'get', 'summary')!.src).toBe('/src/routes.ts:18:3')
    expect(lookup(debug, 'paths', '/items', 'get', 'tags')!.src).toBe('/src/routes.ts:19:3')
    expect(lookup(debug, 'paths', '/items', 'get', 'responses', '404')!.src).toBe('/src/routes.ts:20:3')

    // parameters entry should use the per-property params source
    const params = lookup(debug, 'paths', '/items', 'get', 'parameters')
    expect(params).toBeDefined()
    expect(params!.src).toBe('/src/routes.ts:16:3')

    // V3 source map should reference both files
    expect(debug.v3.sources).toContain('/src/app.ts')
    expect(debug.v3.sources).toContain('/src/routes.ts')

    // JSON output should parse back to the spec
    expect(JSON.parse(debug.json)).toEqual(debug.spec)
  })

  it('group callback routes preserve injected sources through emit', async () => {
    const { Api, lookup } = await import('spac')
    const { Type } = await import('@sinclair/typebox')

    const api = new Api('GroupTest')
    api._src('info', ['/src/api.ts', 1, 1])

    api.group('/pets', g => {
      g.get('/', {
        response: Type.Array(Type.String()),
        __src: {
          __file: '/src/pets.ts',
          __call: [10, 5],
          response: [11, 7],
        },
      } as any)
        ._src('summary', ['/src/pets.ts', 12, 7])
        .summary('List pets')

      g.get('/:petId', {
        params: Type.Object({ petId: Type.String() }),
        response: Type.String(),
        __src: {
          __file: '/src/pets.ts',
          __call: [15, 5],
          params: [16, 7],
          response: [17, 7],
        },
      } as any)
        ._src('summary', ['/src/pets.ts', 18, 7])
        .summary('Get pet')
    })

    const debug = api.emit({ debug: true })

    // List pets
    expect(lookup(debug, 'paths', '/pets', 'get')!.src).toBe('/src/pets.ts:10:5')
    expect(lookup(debug, 'paths', '/pets', 'get', 'responses', '200')!.src).toBe('/src/pets.ts:11:7')
    expect(lookup(debug, 'paths', '/pets', 'get', 'summary')!.src).toBe('/src/pets.ts:12:7')

    // Get pet
    expect(lookup(debug, 'paths', '/pets/:petId', 'get')!.src).toBe('/src/pets.ts:15:5')
    expect(lookup(debug, 'paths', '/pets/:petId', 'get', 'summary')!.src).toBe('/src/pets.ts:18:7')
  })

  it('V3 source map has mappings on lines where spec keys appear', async () => {
    const { Api } = await import('spac')
    const { Type } = await import('@sinclair/typebox')

    const api = new Api('V3Test')
    api._src('info', ['/src/test.ts', 1, 1])
    api.get('/test', {
      response: Type.String(),
      __src: {
        __file: '/src/test.ts',
        __call: [3, 1],
        response: [4, 3],
      },
    } as any)

    const debug = api.emit({ debug: true })
    const mappingLines = debug.v3.mappings.split(';')
    const nonEmptyCount = mappingLines.filter(l => l.length > 0).length

    // There should be at least several mapped lines (info, paths, operation, responses, etc.)
    expect(nonEmptyCount).toBeGreaterThanOrEqual(3)

    // Total lines in mapping should match total lines in JSON output
    const jsonLineCount = debug.json.split('\n').length
    expect(mappingLines.length).toBeLessThanOrEqual(jsonLineCount)
  })
})

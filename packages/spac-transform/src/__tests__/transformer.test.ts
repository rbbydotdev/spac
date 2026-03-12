import { describe, it, expect } from 'vitest'
import { transform } from '../index.js'

describe('spac-transform', () => {
  describe('import detection', () => {
    it('does not transform code without spac imports', () => {
      const code = `
const api = { get: () => {} }
api.get('/pets', { response: Pet })
`
      const result = transform(code, 'test.ts')
      expect(result).not.toContain('__src')
      expect(result).not.toContain('_src')
    })

    it('detects named import of Api from spac', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src')
    })
  })

  describe('new Api() instrumentation', () => {
    it('wraps new Api() with _src("info", ...)', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("info"')
      expect(result).toContain('"test.ts"')
    })
  })

  describe('HTTP method config instrumentation', () => {
    it('injects __src into config object for .get()', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', {
  response: Pet,
  query: Query,
})
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('__src')
      expect(result).toContain('__file: "test.ts"')
      expect(result).toContain('__call')
      // Should have per-property entries
      expect(result).toContain('response:')
      expect(result).toContain('query:')
    })

    it('injects __src for .post() with body', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.post('/pets', { body: CreatePet, response: Pet })
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('__src')
      expect(result).toContain('body:')
    })

    it('handles all HTTP methods', () => {
      const methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace']
      for (const method of methods) {
        const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.${method}('/path', { response: Schema })
`
        const result = transform(code, 'test.ts')
        expect(result).toContain('__src')
      }
    })
  })

  describe('chain method instrumentation', () => {
    it('wraps .summary() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).summary('List pets')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("summary"')
    })

    it('wraps .description() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).description('A detailed description')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("description"')
    })

    it('wraps .tag() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).tag('pets')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("tags"')
    })

    it('wraps .operationId() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).operationId('listPets')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("operationId"')
    })

    it('wraps .deprecated() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).deprecated()
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("deprecated"')
    })

    it('wraps .security() with _src', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).security('bearer')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("security"')
    })

    it('wraps .error() with status code in key', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).error(404, ErrorBody)
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("error:404"')
    })

    it('wraps .extension() with ext: prefix', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet }).extension('rate-limit', 100)
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("ext:x-rate-limit"')
    })

    it('handles chained methods in sequence', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet })
  .summary('List pets')
  .tag('pets')
  .operationId('listPets')
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("summary"')
      expect(result).toContain('_src("tags"')
      expect(result).toContain('_src("operationId"')
    })
  })

  describe('Api-level method instrumentation', () => {
    it('wraps .server() with staged source', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.server({ url: 'https://api.example.com' })
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("__server"')
    })

    it('wraps .tag() on Api with staged source', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.tag({ name: 'pets', description: 'Pet operations' })
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("__tag"')
    })

    it('wraps .securityScheme() with keyed source', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.securityScheme('bearer', { type: 'http', scheme: 'bearer' })
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("securityScheme:bearer"')
    })

    it('wraps .schema() with keyed source', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.schema('Pet', PetSchema)
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('_src("schema:Pet"')
    })
  })

  describe('group callback taint propagation', () => {
    it('instruments methods inside group callbacks', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.group('/pets', g => {
  g.get('/', { response: Pet }).summary('List pets')
})
`
      const result = transform(code, 'test.ts')
      // The group callback param 'g' should be tainted
      expect(result).toContain('__src') // config injection
      expect(result).toContain('_src("summary"') // chain method
    })

    it('instruments nested groups', () => {
      const code = `
import { Api } from 'spac'
const api = new Api('Test')
api.group('/store', g => {
  g.group('/admin', admin => {
    admin.get('/stats', { response: Stats })
  })
})
`
      const result = transform(code, 'test.ts')
      expect(result).toContain('__src')
    })
  })

  describe('source locations are correct', () => {
    it('includes file name in source locations', () => {
      const code = `import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', { response: Pet })
`
      const result = transform(code, '/src/petstore.ts')
      expect(result).toContain('"/src/petstore.ts"')
    })

    it('includes line numbers in __src', () => {
      const code = `import { Api } from 'spac'
const api = new Api('Test')
api.get('/pets', {
  response: Pet,
})
`
      const result = transform(code, 'test.ts')
      // __src should contain numeric line/col arrays
      expect(result).toMatch(/__call: \[\d+, \d+\]/)
      expect(result).toMatch(/response: \[\d+, \d+\]/)
    })
  })
})

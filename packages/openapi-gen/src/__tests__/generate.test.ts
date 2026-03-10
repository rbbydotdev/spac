import { describe, it, expect } from 'vitest'
import { generate } from '../index'

const minimalSpec = {
  openapi: '3.1.0',
  info: { title: 'Pet Store', version: '1.0.0', description: 'A sample API' },
  servers: [{ url: 'https://api.example.com', description: 'Production' }],
  security: [{ bearerAuth: [] }],
  paths: {
    '/pets': {
      get: {
        summary: 'List pets',
        operationId: 'list-pets',
        tags: ['Pets'],
        parameters: [
          { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Pet' } },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create pet',
        operationId: 'create-pet',
        tags: ['Pets'],
        requestBody: {
          content: { 'application/json': { schema: { $ref: '#/components/schemas/CreatePet' } } },
        },
        responses: {
          '201': {
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } },
          },
        },
      },
    },
    '/pets/{petId}': {
      get: {
        summary: 'Get pet',
        operationId: 'get-pet',
        tags: ['Pets'],
        parameters: [
          { name: 'petId', in: 'path', required: true, schema: { type: 'string' } },
        ],
        responses: {
          '200': {
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Pet' } } },
          },
        },
      },
    },
    '/users': {
      get: {
        summary: 'List users',
        operationId: 'list-users',
        tags: ['Users'],
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/User' } },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Pet: {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'string' },
          name: { type: 'string', description: 'Pet name' },
          owner: { $ref: '#/components/schemas/User' },
        },
      },
      CreatePet: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          id: { type: 'string' },
          email: { type: 'string', format: 'email' },
        },
      },
    },
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer' },
    },
  },
}

describe('generate', () => {
  it('produces expected file structure', async () => {
    const files = await generate({ spec: minimalSpec })
    expect(files.has('index.ts')).toBe(true)
    // User is used by both pets (via Pet.owner) and users → shared
    expect(files.has('shared/schemas.ts')).toBe(true)
    expect(files.has('pets/index.ts')).toBe(true)
    expect(files.has('users/index.ts')).toBe(true)
  })

  it('puts shared schemas in shared/schemas.ts', async () => {
    const files = await generate({ spec: minimalSpec })
    const shared = files.get('shared/schemas.ts')!
    // User is referenced by both pets (Pet.owner) and users → shared
    expect(shared).toContain('export const User')
    // Pet is only used by pets group → should NOT be in shared
    expect(shared).not.toContain('export const Pet =')
  })

  it('puts group-specific schemas in group/schemas.ts', async () => {
    const files = await generate({ spec: minimalSpec })
    // Pet and CreatePet are only used by /pets → local to pets
    expect(files.has('pets/schemas.ts')).toBe(true)
    const petsSchemas = files.get('pets/schemas.ts')!
    expect(petsSchemas).toContain('export const Pet')
    expect(petsSchemas).toContain('export const CreatePet')
  })

  it('pets/schemas.ts imports shared User', async () => {
    const files = await generate({ spec: minimalSpec })
    const petsSchemas = files.get('pets/schemas.ts')!
    // Pet references User which is shared
    expect(petsSchemas).toContain('from "../shared/schemas"')
    expect(petsSchemas).toContain('User')
  })

  it('endpoint index imports from correct locations', async () => {
    const files = await generate({ spec: minimalSpec })
    const petsIndex = files.get('pets/index.ts')!
    // Should import Pet/CreatePet from local schemas
    expect(petsIndex).toContain('from "./schemas"')
    // Should import shared schemas if directly used in routes
    expect(petsIndex).toContain('export function registerPets(api: Api)')
  })

  it('index.ts imports groups and has setup', async () => {
    const files = await generate({ spec: minimalSpec })
    const index = files.get('index.ts')!
    expect(index).toContain('new Api("Pet Store"')
    expect(index).toContain('from "./pets')
    expect(index).toContain('from "./users')
    expect(index).toContain('registerPets(api)')
    expect(index).toContain('registerUsers(api)')
    expect(index).toContain('api.emit()')
  })

  describe('stripPrefixes', () => {
    it('groups by path after stripping prefix', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/accounts/{account_id}/access/apps': {
            get: {
              tags: ['Access'],
              responses: { '200': { content: { 'application/json': { schema: { type: 'string' } } } } },
            },
          },
          '/accounts/{account_id}/builds': {
            get: {
              tags: ['Builds'],
              responses: { '200': { content: { 'application/json': { schema: { type: 'string' } } } } },
            },
          },
          '/accounts': {
            get: {
              tags: ['Accounts'],
              responses: { '200': { content: { 'application/json': { schema: { type: 'string' } } } } },
            },
          },
        },
        components: { schemas: {} },
      }

      const files = await generate({ spec, stripPrefixes: ['/accounts/{account_id}'] })
      expect(files.has('access/index.ts')).toBe(true)
      expect(files.has('builds/index.ts')).toBe(true)
      expect(files.has('accounts/index.ts')).toBe(true)
    })
  })

  describe('dependency ordering with dedup aliases', () => {
    it('emits schemas in dependency order when refs go through dedup aliases', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/a': {
            get: {
              responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/wrapper' } } } } },
            },
          },
          '/b': {
            get: {
              responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/base_alias' } } } } },
            },
          },
        },
        components: {
          schemas: {
            // base and base_alias are identical — base_alias dedupes to base
            base: { type: 'string', format: 'date-time' },
            base_alias: { type: 'string', format: 'date-time' },
            // wrapper references base_alias (the dedup alias, not the canonical)
            wrapper: { type: 'object', properties: { ts: { $ref: '#/components/schemas/base_alias' } } },
          },
        },
      }

      const files = await generate({ spec })
      // Find the file containing both Base and Wrapper
      const allSchemaFiles = Array.from(files.entries()).filter(([k]) => k.endsWith('schemas.ts'))
      for (const [, content] of allSchemaFiles) {
        const basePos = content.indexOf('export const Base ')
        const wrapperPos = content.indexOf('export const Wrapper ')
        if (basePos !== -1 && wrapperPos !== -1) {
          expect(basePos).toBeLessThan(wrapperPos)
        }
      }
    })
  })

  describe('deduplication', () => {
    it('deduplicates identical schemas', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test', version: '1.0.0' },
        paths: {
          '/a': {
            get: {
              tags: ['A'],
              responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/aaa_response' } } } } },
            },
          },
          '/b': {
            get: {
              tags: ['B'],
              responses: { '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/bbb_response' } } } } },
            },
          },
        },
        components: {
          schemas: {
            // These are identical
            aaa_response: { type: 'object', properties: { ok: { type: 'boolean' } } },
            bbb_response: { type: 'object', properties: { ok: { type: 'boolean' } } },
          },
        },
      }

      const files = await generate({ spec })
      // Should only have one schema definition (the canonical)
      const allContent = Array.from(files.values()).join('\n')
      const namedCount = (allContent.match(/named\(/g) || []).length
      expect(namedCount).toBe(1) // only one schema generated
    })
  })
})

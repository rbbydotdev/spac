import { describe, it, expect } from 'vitest'
import { Type } from '@sinclair/typebox'
import {
  Api,
  RouteBuilder,
  GroupBuilder,
  named,
  getSchemaName,
  macro,
  json,
  noContent,
  created,
  errorSchema,
  paginated,
  envelope,
} from '../index'

// ---------------------------------------------------------------------------
// Shared test schemas
// ---------------------------------------------------------------------------

const Pet = Type.Object({
  id: Type.String(),
  name: Type.String(),
  tag: Type.Optional(Type.String()),
})

const ErrorBody = Type.Object({
  message: Type.String(),
})

// ===========================================================================
// Api
// ===========================================================================

describe('Api', () => {
  it('creates with name and defaults', () => {
    const api = new Api('Test API')
    expect(api.name).toBe('Test API')
    expect(api.config.version).toBe('1.0.0')
  })

  it('creates with full config', () => {
    const api = new Api('Test API', {
      version: '2.0.0',
      description: 'My API',
      summary: 'A test',
      contact: { name: 'Support', email: 'help@test.com' },
      license: { name: 'MIT' },
    })
    expect(api.config.version).toBe('2.0.0')
    expect(api.config.description).toBe('My API')
  })

  it('adds servers', () => {
    const api = new Api('Test')
    api.server({ url: 'https://api.example.com', description: 'Prod' })
    api.server({ url: 'https://staging.example.com' })
    expect(api._servers).toHaveLength(2)
  })

  it('adds security schemes', () => {
    const api = new Api('Test')
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    expect(api._securitySchemes.bearer.type).toBe('http')
  })

  it('adds tags (string shorthand)', () => {
    const api = new Api('Test')
    api.tag('Pets')
    expect(api._tags[0].name).toBe('Pets')
  })

  it('adds tags (object)', () => {
    const api = new Api('Test')
    api.tag({ name: 'Pets', description: 'Pet operations' })
    expect(api._tags[0].description).toBe('Pet operations')
  })

  it('registers named schemas', () => {
    const api = new Api('Test')
    api.schema('Pet', Pet)
    expect(api._schemas.get('Pet')).toBe(Pet)
  })

  it('sets global security', () => {
    const api = new Api('Test')
    api.security('bearer')
    expect(api._security).toEqual(['bearer'])
  })

  it('applies API-level macros', () => {
    const api = new Api('Test')
    const addServer = macro.api(a => a.server({ url: 'https://api.test.com' }))
    api.use(addServer)
    expect(api._servers).toHaveLength(1)
  })

  it('supports chaining on top-level methods', () => {
    const api = new Api('Test')
    const result = api
      .server({ url: 'https://api.test.com' })
      .tag('Pets')
      .security('bearer')
    expect(result).toBe(api)
  })
})

// ===========================================================================
// Routes
// ===========================================================================

describe('Routes', () => {
  it('creates top-level routes', () => {
    const api = new Api('Test')
    const route = api.get('/pets', { response: Type.Array(Pet) })
    expect(route).toBeInstanceOf(RouteBuilder)
    expect(api._routes).toHaveLength(1)
    expect(api._routes[0].method).toBe('get')
    expect(api._routes[0].fullPath).toBe('/pets')
  })

  it('supports all HTTP methods at top level', () => {
    const api = new Api('Test')
    const config = { response: Pet }
    api.get('/a', config)
    api.post('/b', config)
    api.put('/c', config)
    api.patch('/d', config)
    api.delete('/e', config)
    api.options('/f', config)
    api.head('/g', config)
    api.trace('/h', config)
    expect(api._routes).toHaveLength(8)
    expect(api._routes.map(r => r.method)).toEqual([
      'get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace',
    ])
  })

  it('chains summary, description, tags', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .summary('List pets')
      .description('Returns all pets')
      .tag('Pets')
      .tags('Animals', 'Public')
    const node = api._routes[0]
    expect(node.summary).toBe('List pets')
    expect(node.description).toBe('Returns all pets')
    expect(node.tags).toEqual(['Pets', 'Animals', 'Public'])
  })

  it('chains operationId and deprecated', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .operationId('listPets')
      .deprecated()
    const node = api._routes[0]
    expect(node.operationId).toBe('listPets')
    expect(node.deprecated).toBe(true)
  })

  it('chains security', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .security('bearer')
      .security({ oauth2: ['read:pets'] })
    const node = api._routes[0]
    expect(node.security).toEqual(['bearer', { oauth2: ['read:pets'] }])
  })

  it('chains error responses', () => {
    const api = new Api('Test')
    api.get('/pets/{id}', {
      params: Type.Object({ id: Type.String() }),
      response: Pet,
    })
      .error(404, ErrorBody)
      .error(500, ErrorBody)
    const node = api._routes[0]
    expect(node.errors.size).toBe(2)
    expect(node.errors.has(404)).toBe(true)
    expect(node.errors.has(500)).toBe(true)
  })

  it('chains server', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .server({ url: 'https://special.api.com' })
    expect(api._routes[0].servers).toHaveLength(1)
  })

  it('chains extension', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .extension('rate-limit', 100)
    expect(api._routes[0].extensions['x-rate-limit']).toBe(100)
  })

  it('extension with x- prefix is not doubled', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .extension('x-custom', 'val')
    expect(api._routes[0].extensions['x-custom']).toBe('val')
  })

  it('applies route macros', () => {
    const authed = macro.route(r => r.security('bearer').error(401, ErrorBody))
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) }).use(authed)
    const node = api._routes[0]
    expect(node.security).toEqual(['bearer'])
    expect(node.errors.has(401)).toBe(true)
  })
})

// ===========================================================================
// Groups
// ===========================================================================

describe('Groups', () => {
  it('creates routes within a group', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.get('/', { response: Type.Array(Pet) })
      pets.post('/', { body: Pet, response: Pet })
    })
    expect(api._groups).toHaveLength(1)
    expect(api._groups[0].routes).toHaveLength(2)
    expect(api._groups[0].routes[0].fullPath).toBe('/pets')
    expect(api._groups[0].routes[1].fullPath).toBe('/pets')
  })

  it('nests groups', () => {
    const api = new Api('Test')
    api.group('/api', apiGroup => {
      apiGroup.group('/v1', v1 => {
        v1.get('/pets', { response: Type.Array(Pet) })
      })
    })
    const outer = api._groups[0]
    expect(outer.groups).toHaveLength(1)
    expect(outer.groups[0].routes[0].fullPath).toBe('/api/v1/pets')
  })

  it('sets group-level tag', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.tag('Pets')
      pets.get('/', { response: Type.Array(Pet) })
    })
    expect(api._groups[0].tags).toEqual(['Pets'])
  })

  it('sets group-level security', () => {
    const api = new Api('Test')
    api.group('/admin', admin => {
      admin.security('bearer')
      admin.get('/users', { response: Type.Array(Type.Object({ id: Type.String() })) })
    })
    expect(api._groups[0].security).toEqual(['bearer'])
  })

  it('sets group description', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.description('Pet operations')
      pets.get('/', { response: Type.Array(Pet) })
    })
    expect(api._groups[0].description).toBe('Pet operations')
  })

  it('applies group macros', () => {
    const adminGroup = macro.group(g => g.tag('Admin').security('adminKey'))
    const api = new Api('Test')
    api.group('/admin', admin => {
      admin.use(adminGroup)
      admin.get('/stats', { response: Type.Object({ count: Type.Integer() }) })
    })
    expect(api._groups[0].tags).toEqual(['Admin'])
    expect(api._groups[0].security).toEqual(['adminKey'])
  })

  it('supports all HTTP methods in groups', () => {
    const api = new Api('Test')
    api.group('/res', g => {
      g.get('/', { response: Pet })
      g.post('/', { body: Pet, response: Pet })
      g.put('/{id}', { params: Type.Object({ id: Type.String() }), body: Pet, response: Pet })
      g.patch('/{id}', { params: Type.Object({ id: Type.String() }), body: Pet, response: Pet })
      g.delete('/{id}', { params: Type.Object({ id: Type.String() }), response: Pet })
      g.options('/', { response: Pet })
      g.head('/', { response: Pet })
      g.trace('/', { response: Pet })
    })
    expect(api._groups[0].routes).toHaveLength(8)
  })
})

// ===========================================================================
// Schema naming
// ===========================================================================

describe('Schema Naming', () => {
  it('named() annotates a schema', () => {
    const s = named('Pet', Pet)
    expect(getSchemaName(s)).toBe('Pet')
    expect(s).toBe(Pet) // returns the same object
  })

  it('getSchemaName returns undefined for unannotated schemas', () => {
    const s = Type.String()
    expect(getSchemaName(s)).toBeUndefined()
  })
})

// ===========================================================================
// Helpers
// ===========================================================================

describe('Helpers', () => {
  it('json() returns the schema unchanged', () => {
    const s = Type.Object({ a: Type.String() })
    expect(json(s)).toBe(s)
  })

  it('noContent() creates a description-only response def', () => {
    const r = noContent()
    expect(r.description).toBe('No Content')
    expect(r.schema).toBeUndefined()
  })

  it('created() creates a 201 response def', () => {
    const r = created(Pet)
    expect(r.description).toBe('Created')
    expect(r.schema).toBe(Pet)
  })

  it('errorSchema() creates a standard error object', () => {
    const s = errorSchema()
    expect(s.type).toBe('object')
    expect(s.properties).toBeDefined()
    expect(s.properties!.message).toBeDefined()
  })

  it('paginated() wraps items in pagination envelope', () => {
    const s = paginated(Pet)
    expect(s.type).toBe('object')
    expect(s.properties!.items).toBeDefined()
    expect(s.properties!.total).toBeDefined()
    expect(s.properties!.page).toBeDefined()
  })

  it('envelope() wraps data', () => {
    const s = envelope(Pet)
    expect(s.type).toBe('object')
    expect(s.properties!.data).toBeDefined()
  })
})

// ===========================================================================
// Emit – OpenAPI document
// ===========================================================================

describe('Emit', () => {
  it('emits a minimal valid OpenAPI document', () => {
    const api = new Api('Minimal')
    const doc = api.emit()
    expect(doc.openapi).toBe('3.1.0')
    expect((doc.info as any).title).toBe('Minimal')
    expect((doc.info as any).version).toBe('1.0.0')
  })

  it('emits info fields from config', () => {
    const api = new Api('Full', {
      version: '2.0.0',
      description: 'A full API',
      summary: 'Full API',
      contact: { name: 'Support' },
      license: { name: 'MIT' },
    })
    const doc = api.emit()
    const info = doc.info as any
    expect(info.version).toBe('2.0.0')
    expect(info.description).toBe('A full API')
    expect(info.summary).toBe('Full API')
    expect(info.contact.name).toBe('Support')
    expect(info.license.name).toBe('MIT')
  })

  it('emits servers', () => {
    const api = new Api('Test')
    api.server({ url: 'https://api.example.com', description: 'Prod' })
    const doc = api.emit()
    expect((doc.servers as any[])[0].url).toBe('https://api.example.com')
  })

  it('emits tags', () => {
    const api = new Api('Test')
    api.tag({ name: 'Pets', description: 'Pet ops' })
    const doc = api.emit()
    expect((doc.tags as any[])[0]).toEqual({ name: 'Pets', description: 'Pet ops' })
  })

  it('emits global security', () => {
    const api = new Api('Test')
    api.security('bearer')
    const doc = api.emit()
    expect(doc.security).toEqual([{ bearer: [] }])
  })

  it('emits security schemes in components', () => {
    const api = new Api('Test')
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer' })
    const doc = api.emit()
    const comp = doc.components as any
    expect(comp.securitySchemes.bearer.type).toBe('http')
  })

  // ---- Paths & Operations ----

  it('emits a simple GET route', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .summary('List pets')
      .tag('Pets')
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.summary).toBe('List pets')
    expect(op.tags).toEqual(['Pets'])
    expect(op.responses['200'].content['application/json'].schema).toBeDefined()
  })

  it('emits path parameters from params schema', () => {
    const api = new Api('Test')
    api.get('/pets/{petId}', {
      params: Type.Object({ petId: Type.String() }),
      response: Pet,
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets/{petId}'].get
    expect(op.parameters).toHaveLength(1)
    expect(op.parameters[0].name).toBe('petId')
    expect(op.parameters[0].in).toBe('path')
    expect(op.parameters[0].required).toBe(true)
  })

  it('emits query parameters', () => {
    const api = new Api('Test')
    api.get('/pets', {
      query: Type.Object({
        limit: Type.Integer(),
        filter: Type.Optional(Type.String()),
      }),
      response: Type.Array(Pet),
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    const params = op.parameters as any[]
    expect(params).toHaveLength(2)
    const limitParam = params.find((p: any) => p.name === 'limit')
    const filterParam = params.find((p: any) => p.name === 'filter')
    expect(limitParam.in).toBe('query')
    expect(limitParam.required).toBe(true)
    expect(filterParam.in).toBe('query')
    expect(filterParam.required).toBeUndefined()
  })

  it('emits request body', () => {
    const api = new Api('Test')
    api.post('/pets', { body: Pet, response: Pet })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].post
    expect(op.requestBody.content['application/json'].schema).toBeDefined()
  })

  it('emits responses from shorthand', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.responses['200']).toBeDefined()
    expect(op.responses['200'].description).toBe('Successful response')
  })

  it('emits error responses from chaining', () => {
    const api = new Api('Test')
    api.get('/pets/{id}', {
      params: Type.Object({ id: Type.String() }),
      response: Pet,
    }).error(404, ErrorBody).error(500, ErrorBody)
    const doc = api.emit()
    const op = (doc.paths as any)['/pets/{id}'].get
    expect(op.responses['404']).toBeDefined()
    expect(op.responses['500']).toBeDefined()
  })

  it('emits operationId and deprecated', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .operationId('listPets')
      .deprecated()
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.operationId).toBe('listPets')
    expect(op.deprecated).toBe(true)
  })

  it('emits per-operation security', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .security('bearer')
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.security).toEqual([{ bearer: [] }])
  })

  it('emits extensions on operations', () => {
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .extension('rate-limit', 100)
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op['x-rate-limit']).toBe(100)
  })

  // ---- Groups ----

  it('emits routes from groups at correct paths', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.get('/', { response: Type.Array(Pet) })
      pets.get('/{id}', {
        params: Type.Object({ id: Type.String() }),
        response: Pet,
      })
    })
    const doc = api.emit()
    expect((doc.paths as any)['/pets']).toBeDefined()
    expect((doc.paths as any)['/pets/{id}']).toBeDefined()
  })

  it('inherits tags from groups', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.tag('Pets')
      pets.get('/', { response: Type.Array(Pet) })
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.tags).toContain('Pets')
  })

  it('merges group and route tags', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.tag('Pets')
      pets.get('/', { response: Type.Array(Pet) }).tag('Public')
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.tags).toContain('Pets')
    expect(op.tags).toContain('Public')
  })

  it('deduplicates inherited tags', () => {
    const api = new Api('Test')
    api.group('/pets', pets => {
      pets.tag('Pets')
      pets.get('/', { response: Type.Array(Pet) }).tag('Pets') // duplicate
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    const petTags = op.tags.filter((t: string) => t === 'Pets')
    expect(petTags).toHaveLength(1)
  })

  it('inherits security from groups', () => {
    const api = new Api('Test')
    api.group('/admin', admin => {
      admin.security('bearer')
      admin.get('/stats', { response: Type.Object({ count: Type.Integer() }) })
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/admin/stats'].get
    expect(op.security).toEqual([{ bearer: [] }])
  })

  it('inherits from nested groups', () => {
    const api = new Api('Test')
    api.group('/api', apiGroup => {
      apiGroup.tag('API')
      apiGroup.group('/v1', v1 => {
        v1.tag('V1')
        v1.get('/pets', { response: Type.Array(Pet) })
      })
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/api/v1/pets'].get
    expect(op.tags).toContain('API')
    expect(op.tags).toContain('V1')
  })

  // ---- Schema hoisting ----

  it('hoists named schemas to components.schemas', () => {
    const NamedPet = named('Pet', Type.Object({
      id: Type.String(),
      name: Type.String(),
    }))
    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(NamedPet) })
    const doc = api.emit()
    const comp = doc.components as any
    expect(comp.schemas.Pet).toBeDefined()
    expect(comp.schemas.Pet.type).toBe('object')
  })

  it('generates $ref for named schemas in responses', () => {
    const NamedPet = named('Pet', Type.Object({
      id: Type.String(),
      name: Type.String(),
    }))
    const api = new Api('Test')
    api.get('/pets/{id}', {
      params: Type.Object({ id: Type.String() }),
      response: NamedPet,
    })
    const doc = api.emit()
    const schema = (doc.paths as any)['/pets/{id}'].get.responses['200']
      .content['application/json'].schema
    expect(schema.$ref).toBe('#/components/schemas/Pet')
  })

  it('hoists schemas registered via api.schema()', () => {
    const api = new Api('Test')
    api.schema('Pet', Pet)
    const doc = api.emit()
    const comp = doc.components as any
    expect(comp.schemas.Pet).toBeDefined()
  })

  it('generates $ref for named schemas in request body', () => {
    const NamedPet = named('CreatePet', Type.Object({
      name: Type.String(),
    }))
    const api = new Api('Test')
    api.post('/pets', { body: NamedPet, response: Pet })
    const doc = api.emit()
    const bodySchema = (doc.paths as any)['/pets'].post.requestBody
      .content['application/json'].schema
    expect(bodySchema.$ref).toBe('#/components/schemas/CreatePet')
  })

  // ---- Default response ----

  it('emits a default 200 response when no response is specified', () => {
    const api = new Api('Test')
    api.get('/health', {})
    const doc = api.emit()
    const op = (doc.paths as any)['/health'].get
    expect(op.responses['200'].description).toBe('Successful response')
  })

  // ---- Complex scenario ----

  it('emits a realistic API spec', () => {
    const api = new Api('Pet Store', {
      version: '1.0.0',
      description: 'A sample pet store API',
    })

    api.server({ url: 'https://api.petstore.com/v1' })
    api.securityScheme('bearer', { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    api.tag({ name: 'Pets', description: 'Pet operations' })

    const authed = macro.route(r => r.security('bearer').error(401, ErrorBody))

    api.group('/pets', pets => {
      pets.tag('Pets')

      pets.get('/', {
        query: Type.Object({
          limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100 })),
        }),
        response: Type.Array(Pet),
      })
        .summary('List all pets')
        .operationId('listPets')

      pets.get('/{petId}', {
        params: Type.Object({ petId: Type.String() }),
        response: Pet,
      })
        .summary('Get a pet')
        .operationId('getPet')
        .use(authed)
        .error(404, ErrorBody)

      pets.post('/', {
        body: Type.Object({ name: Type.String(), tag: Type.Optional(Type.String()) }),
        response: Pet,
      })
        .summary('Create a pet')
        .operationId('createPet')
        .use(authed)

      pets.delete('/{petId}', {
        params: Type.Object({ petId: Type.String() }),
        responses: { 204: noContent() },
      })
        .summary('Delete a pet')
        .operationId('deletePet')
        .use(authed)
    })

    const doc = api.emit()

    // Basic structure
    expect(doc.openapi).toBe('3.1.0')
    expect((doc.info as any).title).toBe('Pet Store')
    expect((doc.servers as any[]).length).toBe(1)
    expect((doc.tags as any[]).length).toBe(1)
    expect((doc.components as any).securitySchemes.bearer).toBeDefined()

    // Paths
    const paths = doc.paths as any
    expect(paths['/pets']).toBeDefined()
    expect(paths['/pets/{petId}']).toBeDefined()

    // GET /pets/ – no auth, has query param
    const listOp = paths['/pets'].get
    expect(listOp.operationId).toBe('listPets')
    expect(listOp.tags).toContain('Pets')
    expect(listOp.parameters).toBeDefined()
    expect(listOp.security).toBeUndefined()

    // GET /pets/{petId} – authed, 404 error
    const getOp = paths['/pets/{petId}'].get
    expect(getOp.operationId).toBe('getPet')
    expect(getOp.security).toEqual([{ bearer: [] }])
    expect(getOp.responses['401']).toBeDefined()
    expect(getOp.responses['404']).toBeDefined()

    // POST /pets/ – authed, has body
    const createOp = paths['/pets'].post
    expect(createOp.operationId).toBe('createPet')
    expect(createOp.requestBody).toBeDefined()

    // DELETE /pets/{petId} – authed, 204 no content
    const deleteOp = paths['/pets/{petId}'].delete
    expect(deleteOp.operationId).toBe('deletePet')
    expect(deleteOp.responses['204']).toBeDefined()
    expect(deleteOp.responses['204'].description).toBe('No Content')
  })
})

// ===========================================================================
// Macros
// ===========================================================================

describe('Macros', () => {
  it('macro.route creates a reusable route macro', () => {
    const m = macro.route(r => r.tag('Authed'))
    expect(typeof m).toBe('function')
  })

  it('macro.group creates a reusable group macro', () => {
    const m = macro.group(g => g.tag('Admin'))
    expect(typeof m).toBe('function')
  })

  it('macro.api creates a reusable API macro', () => {
    const m = macro.api(a => a.tag('Global'))
    expect(typeof m).toBe('function')
  })

  it('composes multiple route macros', () => {
    const authed = macro.route(r => r.security('bearer'))
    const withErrors = macro.route(r => r.error(500, ErrorBody))

    const api = new Api('Test')
    api.get('/pets', { response: Type.Array(Pet) })
      .use(authed)
      .use(withErrors)

    const node = api._routes[0]
    expect(node.security).toEqual(['bearer'])
    expect(node.errors.has(500)).toBe(true)
  })
})

// ===========================================================================
// Responses map (explicit multi-status)
// ===========================================================================

describe('Explicit responses map', () => {
  it('emits multiple status codes from responses config', () => {
    const api = new Api('Test')
    api.get('/pets', {
      responses: {
        200: Type.Array(Pet),
        404: ErrorBody,
      },
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.responses['200']).toBeDefined()
    expect(op.responses['404']).toBeDefined()
  })

  it('emits ResponseDef with description and contentType', () => {
    const api = new Api('Test')
    api.get('/pets', {
      responses: {
        200: { description: 'A list of pets', schema: Type.Array(Pet) },
        204: noContent('Nothing here'),
      },
    })
    const doc = api.emit()
    const op = (doc.paths as any)['/pets'].get
    expect(op.responses['200'].description).toBe('A list of pets')
    expect(op.responses['204'].description).toBe('Nothing here')
  })
})

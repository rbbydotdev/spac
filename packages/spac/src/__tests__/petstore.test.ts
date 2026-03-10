import { describe, it, expect } from 'vitest'
import { Type } from '@sinclair/typebox'
import {
  Api,
  named,
  macro,
  noContent,
  created,
  errorSchema,
  paginated,
  envelope,
} from '../index'

// =============================================================================
// Schemas
// =============================================================================

const Category = named(
  'Category',
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
  }),
)

const Tag = named(
  'Tag',
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
  }),
)

const Pet = named(
  'Pet',
  Type.Object({
    id: Type.Integer(),
    name: Type.String(),
    status: Type.Union([
      Type.Literal('available'),
      Type.Literal('pending'),
      Type.Literal('sold'),
    ]),
    category: Type.Optional(Category),
    tags: Type.Optional(Type.Array(Tag)),
    photoUrls: Type.Array(Type.String({ format: 'uri' })),
  }),
)

const CreatePet = named(
  'CreatePet',
  Type.Object({
    name: Type.String({ minLength: 1 }),
    status: Type.Optional(
      Type.Union([
        Type.Literal('available'),
        Type.Literal('pending'),
        Type.Literal('sold'),
      ]),
    ),
    categoryId: Type.Optional(Type.Integer()),
    tagIds: Type.Optional(Type.Array(Type.Integer())),
    photoUrls: Type.Array(Type.String({ format: 'uri' })),
  }),
)

const UpdatePet = named(
  'UpdatePet',
  Type.Object({
    name: Type.Optional(Type.String({ minLength: 1 })),
    status: Type.Optional(
      Type.Union([
        Type.Literal('available'),
        Type.Literal('pending'),
        Type.Literal('sold'),
      ]),
    ),
    categoryId: Type.Optional(Type.Integer()),
    tagIds: Type.Optional(Type.Array(Type.Integer())),
    photoUrls: Type.Optional(Type.Array(Type.String({ format: 'uri' }))),
  }),
)

const Order = named(
  'Order',
  Type.Object({
    id: Type.Integer(),
    petId: Type.Integer(),
    quantity: Type.Integer({ minimum: 1 }),
    shipDate: Type.Optional(Type.String({ format: 'date-time' })),
    status: Type.Union([
      Type.Literal('placed'),
      Type.Literal('approved'),
      Type.Literal('delivered'),
    ]),
    complete: Type.Boolean(),
  }),
)

const CreateOrder = named(
  'CreateOrder',
  Type.Object({
    petId: Type.Integer(),
    quantity: Type.Integer({ minimum: 1 }),
    shipDate: Type.Optional(Type.String({ format: 'date-time' })),
  }),
)

const User = named(
  'User',
  Type.Object({
    id: Type.Integer(),
    username: Type.String(),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    email: Type.String({ format: 'email' }),
    phone: Type.Optional(Type.String()),
    userStatus: Type.Optional(Type.Integer()),
  }),
)

const CreateUser = named(
  'CreateUser',
  Type.Object({
    username: Type.String({ minLength: 3 }),
    firstName: Type.Optional(Type.String()),
    lastName: Type.Optional(Type.String()),
    email: Type.String({ format: 'email' }),
    password: Type.String({ minLength: 8 }),
    phone: Type.Optional(Type.String()),
  }),
)

const LoginResponse = named(
  'LoginResponse',
  Type.Object({
    token: Type.String(),
    expiresIn: Type.Integer(),
  }),
)

const InventoryResponse = named(
  'InventoryResponse',
  Type.Object({
    available: Type.Integer(),
    pending: Type.Integer(),
    sold: Type.Integer(),
  }),
)

const Error = errorSchema()

const DetailedError = errorSchema({
  details: Type.Array(
    Type.Object({
      field: Type.String(),
      issue: Type.String(),
    }),
  ),
})

// =============================================================================
// Macros
// =============================================================================

const authenticated = macro.route(r =>
  r
    .security('bearerAuth')
    .error(401, Error)
    .error(403, Error),
)

const validated = macro.route(r => r.error(422, DetailedError))

const adminSection = macro.group(g =>
  g.tag('admin').security({ bearerAuth: ['admin'] }),
)

const withServers = macro.api(a =>
  a
    .server({
      url: 'https://petstore.example.com/v1',
      description: 'Production',
    })
    .server({
      url: 'https://staging-petstore.example.com/v1',
      description: 'Staging',
    })
    .server({
      url: 'http://localhost:{port}/v1',
      description: 'Local development',
      variables: {
        port: {
          default: '3000',
          enum: ['3000', '3001', '8080'],
          description: 'Server port',
        },
      },
    }),
)

// =============================================================================
// Build the API
// =============================================================================

function buildPetstore() {
  const api = new Api('Petstore', {
    version: '1.0.0',
    description:
      'A classic Pet Store API demonstrating all spac features: groups, ' +
      'named schemas, security, macros, helpers, extensions, and more.',
    termsOfService: 'https://petstore.example.com/terms',
    contact: {
      name: 'Pet Store Support',
      url: 'https://petstore.example.com/support',
      email: 'support@petstore.example.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0',
    },
  })

  api.use(withServers)

  api.schema('Category', Category)
  api.schema('Tag', Tag)
  api.schema('Pet', Pet)
  api.schema('CreatePet', CreatePet)
  api.schema('UpdatePet', UpdatePet)
  api.schema('Order', Order)
  api.schema('CreateOrder', CreateOrder)
  api.schema('User', User)
  api.schema('CreateUser', CreateUser)
  api.schema('LoginResponse', LoginResponse)
  api.schema('InventoryResponse', InventoryResponse)

  api.securityScheme('bearerAuth', {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'JWT bearer token',
  })

  api.securityScheme('apiKey', {
    type: 'apiKey',
    name: 'X-API-Key',
    in: 'header',
    description: 'API key for external integrations',
  })

  api.securityScheme('oauth2', {
    type: 'oauth2',
    description: 'OAuth2 for third-party apps',
    flows: {
      authorizationCode: {
        authorizationUrl: 'https://petstore.example.com/oauth/authorize',
        tokenUrl: 'https://petstore.example.com/oauth/token',
        refreshUrl: 'https://petstore.example.com/oauth/refresh',
        scopes: {
          'read:pets': 'Read pets',
          'write:pets': 'Create and update pets',
          'read:orders': 'Read orders',
          'write:orders': 'Place orders',
          admin: 'Full admin access',
        },
      },
    },
  })

  api.tag({
    name: 'pets',
    description: 'Everything about your pets',
    externalDocs: {
      url: 'https://petstore.example.com/docs/pets',
      description: 'Pet management guide',
    },
  })
  api.tag({ name: 'store', description: 'Access to pet store orders' })
  api.tag({ name: 'users', description: 'Operations about users' })
  api.tag({ name: 'admin', description: 'Admin-only operations' })

  // -- Pets ------------------------------------------------------------------

  api.group('/pets', g => {
    g.tag('pets')

    g.get('/', {
      query: Type.Object({
        status: Type.Optional(
          Type.Union([
            Type.Literal('available'),
            Type.Literal('pending'),
            Type.Literal('sold'),
          ]),
        ),
        category: Type.Optional(Type.String()),
        tags: Type.Optional(Type.Array(Type.String())),
        page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
        pageSize: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
      }),
      response: paginated(Pet),
    })
      .summary('List all pets')
      .description('Returns a paginated list of pets with optional filters.')
      .operationId('listPets')

    g.get('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      response: envelope(Pet),
    })
      .summary('Get a pet by ID')
      .operationId('getPet')
      .error(404, Error)

    g.post('/', {
      body: CreatePet,
      responses: { 201: created(Pet) },
    })
      .summary('Add a new pet')
      .operationId('createPet')
      .use(authenticated)
      .use(validated)

    g.put('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      body: UpdatePet,
      response: Pet,
    })
      .summary('Update a pet')
      .operationId('updatePet')
      .use(authenticated)
      .use(validated)
      .error(404, Error)

    g.patch('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      body: UpdatePet,
      response: Pet,
    })
      .summary('Partially update a pet')
      .operationId('patchPet')
      .use(authenticated)

    g.delete('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      responses: { 204: noContent() },
    })
      .summary('Delete a pet')
      .operationId('deletePet')
      .use(authenticated)
      .error(404, Error)

    g.get('/findByStatus', {
      query: Type.Object({
        status: Type.Union([
          Type.Literal('available'),
          Type.Literal('pending'),
          Type.Literal('sold'),
        ]),
      }),
      responses: {
        200: {
          description: 'Pets matching the status filter',
          schema: Type.Array(Pet),
          headers: { 'X-Total-Count': Type.Integer() },
        },
      },
    })
      .summary('Find pets by status')
      .operationId('findPetsByStatus')

    g.get('/findByTags', {
      query: Type.Object({ tags: Type.Array(Type.String()) }),
      response: Type.Array(Pet),
    })
      .summary('Find pets by tags')
      .operationId('findPetsByTags')
      .deprecated()

    g.post('/:petId/image', {
      params: Type.Object({ petId: Type.Integer() }),
      headers: Type.Object({ 'Content-Length': Type.Integer() }),
      responses: {
        200: {
          description: 'Upload result',
          schema: Type.Object({
            url: Type.String({ format: 'uri' }),
            size: Type.Integer(),
          }),
        },
      },
    })
      .summary('Upload pet image')
      .operationId('uploadPetImage')
      .use(authenticated)
      .extension('x-codegen-request-body-name', 'file')

    g.head('/:petId', {
      params: Type.Object({ petId: Type.Integer() }),
      responses: {
        200: noContent('Pet exists'),
        404: noContent('Pet not found'),
      },
    })
      .summary('Check if pet exists')
      .operationId('petExists')
  })

  // -- Store -----------------------------------------------------------------

  api.group('/store', g => {
    g.tag('store')

    g.get('/inventory', { response: InventoryResponse })
      .summary('Returns pet inventories by status')
      .operationId('getInventory')
      .security('apiKey')

    g.post('/orders', {
      body: CreateOrder,
      responses: { 201: created(Order) },
    })
      .summary('Place an order for a pet')
      .operationId('placeOrder')
      .use(authenticated)
      .use(validated)

    g.get('/orders/:orderId', {
      params: Type.Object({ orderId: Type.Integer() }),
      response: Order,
    })
      .summary('Find purchase order by ID')
      .operationId('getOrder')
      .use(authenticated)
      .error(404, Error)

    g.delete('/orders/:orderId', {
      params: Type.Object({ orderId: Type.Integer() }),
      responses: { 204: noContent() },
    })
      .summary('Delete purchase order by ID')
      .operationId('deleteOrder')
      .use(authenticated)
      .error(404, Error)

    g.group('/admin', admin => {
      admin.use(adminSection)

      admin.get('/stats', {
        response: Type.Object({
          totalOrders: Type.Integer(),
          totalRevenue: Type.Number(),
          averageOrderValue: Type.Number(),
          topSellingPets: Type.Array(
            Type.Object({
              petId: Type.Integer(),
              name: Type.String(),
              orderCount: Type.Integer(),
            }),
          ),
        }),
      })
        .summary('Store statistics')
        .operationId('getStoreStats')
        .extension('x-internal', true)

      admin.delete('/orders', {
        query: Type.Object({ before: Type.String({ format: 'date-time' }) }),
        responses: {
          200: {
            description: 'Purge result',
            schema: Type.Object({ deleted: Type.Integer() }),
          },
        },
      })
        .summary('Purge old orders')
        .operationId('purgeOrders')
    })
  })

  // -- Users -----------------------------------------------------------------

  api.group('/users', g => {
    g.tag('users')

    g.post('/', {
      body: CreateUser,
      responses: { 201: created(User) },
    })
      .summary('Create a new user')
      .operationId('createUser')
      .use(validated)

    g.post('/batch', {
      body: Type.Array(CreateUser),
      responses: { 201: created(Type.Array(User)) },
    })
      .summary('Create multiple users')
      .operationId('createUsersFromList')
      .use(authenticated)
      .use(validated)

    g.post('/login', {
      body: Type.Object({
        username: Type.String(),
        password: Type.String(),
      }),
      responses: {
        200: {
          description: 'Login successful',
          schema: LoginResponse,
          headers: {
            'X-Rate-Limit': Type.Integer({ description: 'Calls per hour allowed' }),
            'X-Expires-After': Type.String({
              format: 'date-time',
              description: 'Token expiration time',
            }),
          },
        },
        401: { description: 'Invalid credentials', schema: Error },
      },
    })
      .summary('Log in a user')
      .operationId('loginUser')

    g.post('/logout', { responses: { 204: noContent('Logged out') } })
      .summary('Log out the current user')
      .operationId('logoutUser')
      .use(authenticated)

    g.get('/:username', {
      params: Type.Object({ username: Type.String() }),
      response: User,
    })
      .summary('Get user by username')
      .operationId('getUserByName')
      .error(404, Error)

    g.put('/:username', {
      params: Type.Object({ username: Type.String() }),
      body: CreateUser,
      response: User,
    })
      .summary('Update user')
      .operationId('updateUser')
      .use(authenticated)
      .use(validated)
      .error(404, Error)

    g.delete('/:username', {
      params: Type.Object({ username: Type.String() }),
      responses: { 204: noContent() },
    })
      .summary('Delete user')
      .operationId('deleteUser')
      .use(authenticated)
      .error(404, Error)
  })

  // -- Top-level routes ------------------------------------------------------

  api.get('/health', {
    response: Type.Object({
      status: Type.Literal('ok'),
      uptime: Type.Number(),
      version: Type.String(),
    }),
  })
    .summary('Health check')
    .operationId('healthCheck')
    .server({ url: 'http://localhost:3000', description: 'Health check only on local' })

  api.options('/pets', { responses: { 204: noContent('CORS preflight') } })
    .summary('CORS preflight for /pets')
    .extension('x-internal', true)

  return api.emit()
}

// =============================================================================
// Tests
// =============================================================================

describe('Petstore', () => {
  const spec = buildPetstore() as any

  // -- Document structure ----------------------------------------------------

  describe('document structure', () => {
    it('has openapi 3.1.0', () => {
      expect(spec.openapi).toBe('3.1.0')
    })

    it('has info with all fields', () => {
      expect(spec.info.title).toBe('Petstore')
      expect(spec.info.version).toBe('1.0.0')
      expect(spec.info.description).toContain('Pet Store API')
      expect(spec.info.termsOfService).toBe('https://petstore.example.com/terms')
      expect(spec.info.contact).toEqual({
        name: 'Pet Store Support',
        url: 'https://petstore.example.com/support',
        email: 'support@petstore.example.com',
      })
      expect(spec.info.license).toEqual({
        name: 'Apache 2.0',
        url: 'https://www.apache.org/licenses/LICENSE-2.0',
      })
    })
  })

  // -- Servers ---------------------------------------------------------------

  describe('servers', () => {
    it('has 3 servers from api macro', () => {
      expect(spec.servers).toHaveLength(3)
    })

    it('production server', () => {
      expect(spec.servers[0]).toEqual({
        url: 'https://petstore.example.com/v1',
        description: 'Production',
      })
    })

    it('local dev server with variables', () => {
      const local = spec.servers[2]
      expect(local.url).toBe('http://localhost:{port}/v1')
      expect(local.variables.port).toEqual({
        default: '3000',
        enum: ['3000', '3001', '8080'],
        description: 'Server port',
      })
    })
  })

  // -- Tags ------------------------------------------------------------------

  describe('tags', () => {
    it('has 4 global tags', () => {
      expect(spec.tags).toHaveLength(4)
      const names = spec.tags.map((t: any) => t.name)
      expect(names).toEqual(['pets', 'store', 'users', 'admin'])
    })

    it('pets tag has externalDocs', () => {
      const pets = spec.tags.find((t: any) => t.name === 'pets')
      expect(pets.externalDocs).toEqual({
        url: 'https://petstore.example.com/docs/pets',
        description: 'Pet management guide',
      })
    })
  })

  // -- Security schemes ------------------------------------------------------

  describe('security schemes', () => {
    it('has bearerAuth, apiKey, oauth2', () => {
      const schemes = spec.components.securitySchemes
      expect(Object.keys(schemes)).toEqual(
        expect.arrayContaining(['bearerAuth', 'apiKey', 'oauth2']),
      )
    })

    it('bearerAuth is http/bearer/JWT', () => {
      const s = spec.components.securitySchemes.bearerAuth
      expect(s.type).toBe('http')
      expect(s.scheme).toBe('bearer')
      expect(s.bearerFormat).toBe('JWT')
    })

    it('apiKey is header X-API-Key', () => {
      const s = spec.components.securitySchemes.apiKey
      expect(s.type).toBe('apiKey')
      expect(s.name).toBe('X-API-Key')
      expect(s.in).toBe('header')
    })

    it('oauth2 has authorization code flow with scopes', () => {
      const flow = spec.components.securitySchemes.oauth2.flows.authorizationCode
      expect(flow.authorizationUrl).toBe('https://petstore.example.com/oauth/authorize')
      expect(flow.tokenUrl).toBe('https://petstore.example.com/oauth/token')
      expect(flow.refreshUrl).toBe('https://petstore.example.com/oauth/refresh')
      expect(Object.keys(flow.scopes)).toHaveLength(5)
    })
  })

  // -- Named schemas / $ref hoisting -----------------------------------------

  describe('components.schemas', () => {
    it('hoists all named schemas', () => {
      const names = Object.keys(spec.components.schemas)
      expect(names).toEqual(
        expect.arrayContaining([
          'Category', 'Tag', 'Pet', 'CreatePet', 'UpdatePet',
          'Order', 'CreateOrder', 'User', 'CreateUser',
          'LoginResponse', 'InventoryResponse',
        ]),
      )
    })

    it('Pet schema has correct properties', () => {
      const pet = spec.components.schemas.Pet
      expect(pet.type).toBe('object')
      expect(pet.required).toEqual(
        expect.arrayContaining(['id', 'name', 'status', 'photoUrls']),
      )
      expect(Object.keys(pet.properties)).toEqual(
        expect.arrayContaining(['id', 'name', 'status', 'category', 'tags', 'photoUrls']),
      )
    })
  })

  // -- Paths: count and existence --------------------------------------------

  describe('paths', () => {
    const paths = () => Object.keys(spec.paths)

    it('has all expected paths', () => {
      const p = paths()
      // Pets
      expect(p).toContain('/pets')
      expect(p).toContain('/pets/:petId')
      expect(p).toContain('/pets/findByStatus')
      expect(p).toContain('/pets/findByTags')
      expect(p).toContain('/pets/:petId/image')
      // Store
      expect(p).toContain('/store/inventory')
      expect(p).toContain('/store/orders')
      expect(p).toContain('/store/orders/:orderId')
      expect(p).toContain('/store/admin/stats')
      expect(p).toContain('/store/admin/orders')
      // Users
      expect(p).toContain('/users')
      expect(p).toContain('/users/batch')
      expect(p).toContain('/users/login')
      expect(p).toContain('/users/logout')
      expect(p).toContain('/users/:username')
      // Top-level
      expect(p).toContain('/health')
      // Top-level options on /pets (distinct from group /pets/)
      expect(p).toContain('/pets')
    })
  })

  // -- Pet operations --------------------------------------------------------

  describe('pet operations', () => {
    it('GET /pets/ — listPets has query params and paginated response', () => {
      const op = spec.paths['/pets'].get
      expect(op.operationId).toBe('listPets')
      expect(op.summary).toBe('List all pets')
      expect(op.description).toContain('paginated')
      expect(op.tags).toContain('pets')

      const paramNames = op.parameters.map((p: any) => p.name)
      expect(paramNames).toEqual(
        expect.arrayContaining(['status', 'category', 'tags', 'page', 'pageSize']),
      )
      // All query params are optional
      op.parameters.forEach((p: any) => {
        expect(p.in).toBe('query')
        expect(p.required).toBeUndefined()
      })

      // Paginated envelope
      const schema = op.responses['200'].content['application/json'].schema
      expect(schema.properties).toHaveProperty('items')
      expect(schema.properties).toHaveProperty('total')
      expect(schema.properties).toHaveProperty('page')
      expect(schema.properties).toHaveProperty('pageSize')
    })

    it('GET /pets/:petId — getPet has path param and envelope response', () => {
      const op = spec.paths['/pets/:petId'].get
      expect(op.operationId).toBe('getPet')
      expect(op.parameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'petId', in: 'path', required: true }),
        ]),
      )
      // Envelope
      const schema = op.responses['200'].content['application/json'].schema
      expect(schema.properties).toHaveProperty('data')
      // 404 error
      expect(op.responses).toHaveProperty('404')
    })

    it('POST /pets/ — createPet uses authenticated + validated macros', () => {
      const op = spec.paths['/pets'].post
      expect(op.operationId).toBe('createPet')
      // Request body with $ref to CreatePet
      expect(op.requestBody.content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/CreatePet',
      })
      // 201 Created
      expect(op.responses['201'].description).toBe('Created')
      // Authenticated macro: security + 401/403
      expect(op.security).toEqual(
        expect.arrayContaining([{ bearerAuth: [] }]),
      )
      expect(op.responses).toHaveProperty('401')
      expect(op.responses).toHaveProperty('403')
      // Validated macro: 422
      expect(op.responses).toHaveProperty('422')
    })

    it('PUT /pets/:petId — updatePet has body, auth, validation, and 404', () => {
      const op = spec.paths['/pets/:petId'].put
      expect(op.operationId).toBe('updatePet')
      expect(op.requestBody.content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/UpdatePet',
      })
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
      expect(op.responses).toHaveProperty('200')
      expect(op.responses).toHaveProperty('401')
      expect(op.responses).toHaveProperty('403')
      expect(op.responses).toHaveProperty('404')
      expect(op.responses).toHaveProperty('422')
    })

    it('PATCH /pets/:petId — patchPet has auth but no validation macro', () => {
      const op = spec.paths['/pets/:petId'].patch
      expect(op.operationId).toBe('patchPet')
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
      expect(op.responses).toHaveProperty('401')
      expect(op.responses).not.toHaveProperty('422')
    })

    it('DELETE /pets/:petId — deletePet returns 204 and 404', () => {
      const op = spec.paths['/pets/:petId'].delete
      expect(op.operationId).toBe('deletePet')
      expect(op.responses['204'].description).toBe('No Content')
      expect(op.responses).toHaveProperty('404')
    })

    it('GET /pets/findByStatus — response headers', () => {
      const op = spec.paths['/pets/findByStatus'].get
      expect(op.operationId).toBe('findPetsByStatus')
      const resp = op.responses['200']
      expect(resp.description).toBe('Pets matching the status filter')
      expect(resp.headers).toHaveProperty('X-Total-Count')
      expect(resp.headers['X-Total-Count'].schema.type).toBe('integer')
    })

    it('GET /pets/findByTags — deprecated', () => {
      const op = spec.paths['/pets/findByTags'].get
      expect(op.operationId).toBe('findPetsByTags')
      expect(op.deprecated).toBe(true)
    })

    it('POST /pets/:petId/image — headers param and extension', () => {
      const op = spec.paths['/pets/:petId/image'].post
      expect(op.operationId).toBe('uploadPetImage')
      const headerParams = op.parameters.filter((p: any) => p.in === 'header')
      expect(headerParams).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'Content-Length', in: 'header' }),
        ]),
      )
      expect(op['x-codegen-request-body-name']).toBe('file')
    })

    it('HEAD /pets/:petId — petExists with 200 and 404 no-content', () => {
      const op = spec.paths['/pets/:petId'].head
      expect(op.operationId).toBe('petExists')
      expect(op.responses['200'].description).toBe('Pet exists')
      expect(op.responses['404'].description).toBe('Pet not found')
      // No content body
      expect(op.responses['200'].content).toBeUndefined()
      expect(op.responses['404'].content).toBeUndefined()
    })
  })

  // -- Store operations ------------------------------------------------------

  describe('store operations', () => {
    it('GET /store/inventory — apiKey security', () => {
      const op = spec.paths['/store/inventory'].get
      expect(op.operationId).toBe('getInventory')
      expect(op.tags).toContain('store')
      expect(op.security).toEqual(expect.arrayContaining([{ apiKey: [] }]))
      expect(op.responses['200'].content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/InventoryResponse',
      })
    })

    it('POST /store/orders — placeOrder with 201', () => {
      const op = spec.paths['/store/orders'].post
      expect(op.operationId).toBe('placeOrder')
      expect(op.requestBody.content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/CreateOrder',
      })
      expect(op.responses).toHaveProperty('201')
    })

    it('GET /store/orders/:orderId — getOrder with 404', () => {
      const op = spec.paths['/store/orders/:orderId'].get
      expect(op.operationId).toBe('getOrder')
      expect(op.responses).toHaveProperty('404')
    })

    it('DELETE /store/orders/:orderId — 204 + 404', () => {
      const op = spec.paths['/store/orders/:orderId'].delete
      expect(op.operationId).toBe('deleteOrder')
      expect(op.responses).toHaveProperty('204')
      expect(op.responses).toHaveProperty('404')
    })
  })

  // -- Nested group: admin ---------------------------------------------------

  describe('store admin (nested group)', () => {
    it('GET /store/admin/stats — inherits store + admin tags', () => {
      const op = spec.paths['/store/admin/stats'].get
      expect(op.operationId).toBe('getStoreStats')
      expect(op.tags).toContain('store')
      expect(op.tags).toContain('admin')
      expect(op['x-internal']).toBe(true)
    })

    it('admin group inherits security with scopes', () => {
      const op = spec.paths['/store/admin/stats'].get
      expect(op.security).toEqual(
        expect.arrayContaining([{ bearerAuth: ['admin'] }]),
      )
    })

    it('DELETE /store/admin/orders — purgeOrders has query param', () => {
      const op = spec.paths['/store/admin/orders'].delete
      expect(op.operationId).toBe('purgeOrders')
      expect(op.parameters).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ name: 'before', in: 'query', required: true }),
        ]),
      )
    })
  })

  // -- User operations -------------------------------------------------------

  describe('user operations', () => {
    it('POST /users/ — createUser with validation', () => {
      const op = spec.paths['/users'].post
      expect(op.operationId).toBe('createUser')
      expect(op.tags).toContain('users')
      expect(op.responses).toHaveProperty('201')
      expect(op.responses).toHaveProperty('422')
      // No auth required for registration
      expect(op.security).toBeUndefined()
    })

    it('POST /users/batch — createUsersFromList needs auth', () => {
      const op = spec.paths['/users/batch'].post
      expect(op.operationId).toBe('createUsersFromList')
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
    })

    it('POST /users/login — returns LoginResponse with headers', () => {
      const op = spec.paths['/users/login'].post
      expect(op.operationId).toBe('loginUser')
      const ok = op.responses['200']
      expect(ok.description).toBe('Login successful')
      expect(ok.content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/LoginResponse',
      })
      expect(ok.headers).toHaveProperty('X-Rate-Limit')
      expect(ok.headers).toHaveProperty('X-Expires-After')
      // 401 for invalid creds
      expect(op.responses['401'].description).toBe('Invalid credentials')
    })

    it('POST /users/logout — 204 with auth', () => {
      const op = spec.paths['/users/logout'].post
      expect(op.operationId).toBe('logoutUser')
      expect(op.responses['204'].description).toBe('Logged out')
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
    })

    it('GET /users/:username — getUserByName with 404', () => {
      const op = spec.paths['/users/:username'].get
      expect(op.operationId).toBe('getUserByName')
      expect(op.responses['200'].content['application/json'].schema).toEqual({
        $ref: '#/components/schemas/User',
      })
      expect(op.responses).toHaveProperty('404')
    })

    it('PUT /users/:username — updateUser with auth + validation + 404', () => {
      const op = spec.paths['/users/:username'].put
      expect(op.operationId).toBe('updateUser')
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
      expect(op.responses).toHaveProperty('401')
      expect(op.responses).toHaveProperty('422')
      expect(op.responses).toHaveProperty('404')
    })

    it('DELETE /users/:username — deleteUser with auth + 404', () => {
      const op = spec.paths['/users/:username'].delete
      expect(op.operationId).toBe('deleteUser')
      expect(op.security).toEqual(expect.arrayContaining([{ bearerAuth: [] }]))
      expect(op.responses).toHaveProperty('204')
      expect(op.responses).toHaveProperty('404')
    })
  })

  // -- Top-level routes ------------------------------------------------------

  describe('top-level routes', () => {
    it('GET /health — has per-operation server', () => {
      const op = spec.paths['/health'].get
      expect(op.operationId).toBe('healthCheck')
      expect(op.tags).toBeUndefined()
      expect(op.security).toBeUndefined()
      expect(op.servers).toEqual([
        { url: 'http://localhost:3000', description: 'Health check only on local' },
      ])
    })

    it('OPTIONS /pets — CORS preflight with extension', () => {
      const op = spec.paths['/pets'].options
      expect(op.summary).toBe('CORS preflight for /pets')
      expect(op['x-internal']).toBe(true)
      expect(op.responses['204'].description).toBe('CORS preflight')
    })
  })

  // -- $ref resolution -------------------------------------------------------

  describe('$ref resolution', () => {
    it('named schemas in request bodies become $ref', () => {
      const schema = spec.paths['/pets'].post.requestBody.content['application/json'].schema
      expect(schema.$ref).toBe('#/components/schemas/CreatePet')
    })

    it('named schemas in responses become $ref', () => {
      const schema = spec.paths['/store/inventory'].get
        .responses['200'].content['application/json'].schema
      expect(schema.$ref).toBe('#/components/schemas/InventoryResponse')
    })

    it('paginated helper wraps $ref in items array', () => {
      const schema = spec.paths['/pets'].get
        .responses['200'].content['application/json'].schema
      expect(schema.properties.items.type).toBe('array')
      expect(schema.properties.items.items).toEqual({
        $ref: '#/components/schemas/Pet',
      })
    })

    it('envelope helper wraps $ref in data property', () => {
      const schema = spec.paths['/pets/:petId'].get
        .responses['200'].content['application/json'].schema
      expect(schema.properties.data).toEqual({
        $ref: '#/components/schemas/Pet',
      })
    })
  })

  // -- Group tag inheritance -------------------------------------------------

  describe('group tag inheritance', () => {
    it('pet routes inherit "pets" tag', () => {
      expect(spec.paths['/pets'].get.tags).toContain('pets')
      expect(spec.paths['/pets/:petId'].get.tags).toContain('pets')
      expect(spec.paths['/pets/:petId'].delete.tags).toContain('pets')
    })

    it('store routes inherit "store" tag', () => {
      expect(spec.paths['/store/inventory'].get.tags).toContain('store')
      expect(spec.paths['/store/orders'].post.tags).toContain('store')
    })

    it('user routes inherit "users" tag', () => {
      expect(spec.paths['/users'].post.tags).toContain('users')
      expect(spec.paths['/users/:username'].get.tags).toContain('users')
    })

    it('nested admin group inherits parent store tag + own admin tag', () => {
      const op = spec.paths['/store/admin/orders'].delete
      expect(op.tags).toContain('store')
      expect(op.tags).toContain('admin')
    })
  })

  // -- Feature coverage summary ----------------------------------------------

  describe('feature coverage', () => {
    it('uses all 8 HTTP methods across the spec', () => {
      const methods = new Set<string>()
      for (const pathItem of Object.values(spec.paths) as any[]) {
        for (const m of ['get','post','put','patch','delete','options','head','trace']) {
          if (pathItem[m]) methods.add(m)
        }
      }
      // We use 7 of 8 (no trace in petstore)
      expect(methods).toEqual(new Set(['get', 'post', 'put', 'patch', 'delete', 'options', 'head']))
    })

    it('has operations with path, query, and header parameters', () => {
      // path params
      expect(spec.paths['/pets/:petId'].get.parameters.some((p: any) => p.in === 'path')).toBe(true)
      // query params
      expect(spec.paths['/pets'].get.parameters.some((p: any) => p.in === 'query')).toBe(true)
      // header params
      expect(spec.paths['/pets/:petId/image'].post.parameters.some((p: any) => p.in === 'header')).toBe(true)
    })

    it('uses all three macro types', () => {
      // Route macro: authenticated adds security
      expect(spec.paths['/pets'].post.security).toBeDefined()
      // Group macro: adminSection adds tag + security
      expect(spec.paths['/store/admin/stats'].get.tags).toContain('admin')
      // Api macro: withServers adds servers
      expect(spec.servers).toHaveLength(3)
    })

    it('uses response helpers: created, noContent, paginated, envelope, errorSchema', () => {
      // created
      expect(spec.paths['/pets'].post.responses['201'].description).toBe('Created')
      // noContent
      expect(spec.paths['/pets/:petId'].delete.responses['204'].description).toBe('No Content')
      // paginated
      const pag = spec.paths['/pets'].get.responses['200'].content['application/json'].schema
      expect(pag.required).toEqual(expect.arrayContaining(['items', 'total', 'page', 'pageSize']))
      // envelope
      const env = spec.paths['/pets/:petId'].get.responses['200'].content['application/json'].schema
      expect(env.required).toEqual(expect.arrayContaining(['data']))
      // errorSchema
      expect(spec.paths['/pets'].post.responses['401']).toBeDefined()
    })
  })
})

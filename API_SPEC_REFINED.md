Your message:

Take this spec conversation and help me distill it,  
i want an Api lib which uses objects, route callbacks and chaining, this
way i have all methods possible to use to assemble my spec  
I also like the mdx doc creation. and macros,  
then also, make a bulleted list of other features suggested

Pasted
Text 1





GPT-5.4

\$\$\$

Low

Search

Attach

Retry







### Reasoning

Assistant Reply:

Here’s a distilled direction for your library.

- Goal: a TypeScript-first OpenAPI authoring library
- Style: object-based, chainable, callback-driven
- Philosophy:
  - OpenAPI is the output, not the authoring experience
  - TypeScript objects/functions are the source of truth
  - The library should feel composable and expressive, not
    declarative-YAML-shaped
  - Runtime integration is optional; contracts/types are primary

Core design direction

- Use objects for configuration
- Use route callbacks/builders for ergonomic assembly
- Use chaining so advanced OpenAPI features are discoverable
- Use macros/helpers to eliminate repetition
- Emit:
  - `openapi.yaml` or `openapi.json`
  - docs, potentially MDX
  - optional source maps / trace metadata
  - exported contract types

A good mental model

- `Api` builds an internal AST
- groups/resources/routes are nodes in that AST
- chaining mutates/enriches nodes
- `emit()` compiles the AST into:
  - OpenAPI
  - metadata maps
  - optional type exports / client artifacts

Suggested shape

1.  Top-level API object

ts







``` shiki
const api = new Api("Store API", {
  version: "1.0.0",
  description: "Example API",
});
```

2.  Object-based schema definitions

ts







``` shiki
const Address = t.object({
  street: t.string(),
  city: t.string(),
});

const Store = t.object({
  name: t.string(),
  address: Address,
});
```

3.  Groups with callbacks

ts







``` shiki
api.group("/stores", (stores) => {
  stores
    .get("/", {
      query: t.object({
        filter: t.string().optional(),
      }),
      response: t.array(Store),
    })
    .summary("List stores");

  stores
    .get("/{id}", {
      params: t.object({
        id: t.string(),
      }),
      response: Store,
    })
    .summary("Read a store");
});
```

This gives you:

- object config
- route callbacks
- chaining

4.  Chainable route builders

Instead of cramming every OpenAPI option into one huge object, let the
route be enriched incrementally.

ts







``` shiki
api.group("/stores", (stores) => {
  stores
    .get("/{id}", {
      params: t.object({ id: t.string() }),
      response: Store,
    })
    .summary("Read store")
    .description("Fetch a store by id")
    .tag("Stores")
    .operationId("readStore")
    .error(404, NotFound)
    .security("bearer")
    .deprecated();
});
```

This is probably the most important design choice:

- initial object handles the main contract
- chaining handles the long tail of OpenAPI features

Recommended API style

Route creation:

- `get(path, config)`
- `post(path, config)`
- `put(path, config)`
- `patch(path, config)`
- `delete(path, config)`
- `options(path, config)`
- `head(path, config)`
- `trace(path, config)`

Chaining for route metadata:

- `.summary(text)`
- `.description(text)`
- `.tag(name)`
- `.tags(...names)`
- `.operationId(id)`
- `.deprecated()`
- `.externalDocs(...)`
- `.security(...)`
- `.servers(...)`
- `.header(name, schema, options?)`
- `.query(schema)`
- `.params(schema)`
- `.body(schema)`
- `.response(schema)` or `.responses({...})`
- `.contentType(type, schema)`
- `.example(name, value)`
- `.examples({...})`
- `.link(...)`
- `.callback(...)`
- `.extension(name, value)`

Group-level chaining:

- `.tag("Stores")`
- `.security("bearer")`
- `.prefix("/v1")`
- `.use(macro)`
- `.middleware(metadataOnlyMacro)`
- `.description(...)`

Schema ergonomics to prioritize

Your schema layer should support:

- `t.object`
- `t.string`, `t.int`, `t.number`, `t.boolean`
- `t.array`
- `t.enum`
- `t.literal`
- `t.union`
- `t.discriminatedUnion`
- `t.optional`
- `t.nullable`
- `t.record`
- `t.tuple`
- `t.file`
- `t.datetime`
- `t.uuid`
- `t.ref(() => Schema)` for cycles

Transform helpers:

- `.partial()`
- `.pick(...)`
- `.omit(...)`
- `.extend(...)`
- `.merge(...)`

That gives you most of the “OpenAPI is painful” wins.

Best distilled authoring pattern

I think your sweet spot is:

- object config for core shape
- chaining for obscure/extensive OpenAPI options
- callback grouping for composition
- macros for reuse

Example of the intended feel

ts







``` shiki
const api = new Api("Store API");

const Address = t.object({
  street: t.string(),
  city: t.string(),
});

const Store = t.object({
  id: t.string(),
  name: t.string(),
  address: Address,
});

api.group("/stores", (stores) => {
  stores
    .get("/", {
      query: t.object({
        filter: t.string().optional(),
      }),
      response: t.array(Store),
    })
    .summary("List stores")
    .tag("Stores");

  stores
    .get("/{id}", {
      params: t.object({
        id: t.string(),
      }),
      response: Store,
    })
    .summary("Read store")
    .error(404, t.object({ message: t.string() }));
});

api.emit("openapi.yaml");
```

Macros

Macros are a major part of what makes this better than plain OpenAPI.

Use macros for:

- auth defaults
- standard error sets
- pagination
- response envelopes
- CRUD patterns
- shared headers
- common query params
- org conventions

Possible macro shapes

1.  Route macro

ts







``` shiki
const authed = macro.route((route) =>
  route.security("bearer").error(401, UnauthorizedError)
);
```

Usage:

ts







``` shiki
stores
  .get("/{id}", {
    params: t.object({ id: t.string() }),
    response: Store,
  })
  .use(authed);
```

2.  Group macro

ts







``` shiki
const admin = macro.group((group) =>
  group.tag("Admin").security("adminBearer")
);
```

3.  Schema macro / helper

ts







``` shiki
const paginated = <T>(item: Schema<T>) =>
  t.object({
    items: t.array(item),
    total: t.int(),
    page: t.int(),
    pageSize: t.int(),
  });
```

4.  Resource macro

ts







``` shiki
api.resource("stores", (r) => {
  r.model(Store).id(t.string()).crud();
});
```


Distilled architecture recommendation

Use a layered design:

- Layer 1: DSL / builders
  - `Api`, `Group`, `Route`, `Schema`
- Layer 2: internal AST
  - normalized representation of everything
- Layer 3: transforms
  - macros
  - policy enforcement
  - component hoisting
  - operationId generation
- Layer 4: emitters
  - OpenAPI YAML/JSON
  - MDX docs
  - source map / trace file
  - type contract exports

This will keep the system clean as features grow.

What to prioritize first

MVP

- `Api`
- `group(path, cb)`
- HTTP methods
- `t.object` and primitives
- `response`, `params`, `query`, `body`
- YAML emit
- automatic component hoisting
- tags / summary / description
- basic macros

Next

- chaining for advanced route metadata
- schema transforms
- operationId generation
- path param validation
- type exports for routes

Later

- source maps
- callbacks/links
- multipart encoding
- parameter serialization styles
- advanced security logic
- spec diffing

Bulleted list of other features suggested

- Automatic schema component hoisting and `$ref` generation
- Schema transforms:
  - `pick`
  - `omit`
  - `partial`
  - `extend`
  - `merge`
- Automatic CRUD/resource builders
- Reusable route presets/helpers
- First-class error modeling and shared error sets
- Discriminated unions / polymorphism with automatic discriminator
  wiring
- Compile-time path parameter validation from route strings
- Optional inference of path params from `"/{id}"` patterns
- Exact matching between path params and declared param schema
- Contract type exports for server implementations
- Type-safe response-by-status modeling
- Optional “all spec routes must be implemented” typing
- Framework-agnostic contract generation
- Optional framework adapters
- Pagination helpers
- Response envelope helpers
- Shared query/parameter builders
- Automatic operationId generation
- Automatic example generation and example validation
- Environment-aware/server-aware spec emission
- Multi-spec generation:
  - public
  - internal
  - dev/prod
- Versioning helpers and deprecation workflows
- Spec-wide policy enforcement
- Automatic tagging strategies
- Security composition helpers with explicit AND/OR semantics
- Multipart/form-data builders
- Multiple media type/content negotiation helpers
- Parameter serialization helpers:
  - deepObject
  - pipeDelimited
  - spaceDelimited
  - matrix
  - label
- Request body encoding helpers
- OpenAPI callbacks ergonomics
- OpenAPI links ergonomics
- Vendor extension support via ergonomic APIs
- Source tracing / source maps from YAML back to TypeScript
- CLI “explain where this YAML node came from”
- Dead schema / unused definition detection
- Semantic diffing / breaking change detection
- Client/SDK generation
- Contract test generation/hooks
- Circular reference support
- Stable component naming / deduplication
- Modular spec composition across files/modules
- Path collision / schema collision detection during composition
- Embedded long-form route/schema docs
- Refactor-safe naming and symbol reuse through TypeScript
- Optional internal AST plugins / extension system

If you want, I can next turn this into:

- a 1-page product vision
- a concrete TypeScript API design
- or an MVP feature checklist with example signatures for `Api`,
  `Group`, `Route`, and `t`





Retry

GPT-5.4 (low)

GPT-5.4 (low)

68.09
tok/sec

2477
tokens

Time-to-First:
1.2 sec

Your message:

I forgot to mention, we will use typebox for the inputs, since it
compiles into json schema





GPT-5.4

\$\$\$

Low

Search

Attach

Retry







### Reasoning

Assistant Reply:

Perfect — that sharpens the design a lot.

Using TypeBox is a strong choice because it gives you:

- TypeScript-friendly schema authoring
- JSON Schema output
- static type inference
- optional runtime validation tooling
- a mature ecosystem instead of inventing `t` from scratch

That means your library is less “build a schema system” and more:

- build an API/spec DSL
- build a composition/macro system
- normalize TypeBox schemas into OpenAPI-compatible output
- emit OpenAPI +  type contracts

Distilled vision with TypeBox

Your library becomes:

- an OpenAPI authoring and composition library
- using:
  - objects
  - route callbacks
  - chaining
  - macros
- with TypeBox as the schema layer

So the stack is roughly:

- TypeBox = schema language
- your library = API DSL and compiler
- output = OpenAPI, docs, source maps, contract metadata

Recommended mental model

- TypeBox handles schema definition
- your API library handles:
  - paths
  - operations
  - parameters
  - request/response bodies
  - tags
  - security
  - examples
  - links/callbacks
  - docs
  - macros
  - emitters

That keeps responsibilities clean.

Suggested API shape with TypeBox

Example from your store case:

ts







``` shiki
import { Type as T, Static } from "@sinclair/typebox";
import { Api } from "@your/api";

const api = new Api("Store API", {
  version: "1.0.0",
});

const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

const Store = T.Object({
  name: T.String(),
  address: Address,
});

api.group("/stores", (stores) => {
  stores
    .get("/", {
      query: T.Object({
        filter: T.Optional(T.String()),
      }),
      response: T.Array(Store),
    })
    .summary("List stores")
    .tag("Stores");

  stores
    .get("/{id}", {
      params: T.Object({
        id: T.String(),
      }),
      response: Store,
    })
    .summary("Read store")
    .tag("Stores");
});

api.emit("openapi.yaml");
export type StoreType = Static<typeof Store>;
```

This is already very good:

- normal TS objects
- route callbacks
- chaining
- TypeBox schemas
- exported inferred types

What changes now that TypeBox is the schema layer

1.  You probably don’t need a custom `t`

Instead of inventing a schema DSL, just embrace TypeBox:

- `Type.String()`
- `Type.Object(...)`
- `Type.Array(...)`
- `Type.Union(...)`
- `Type.Optional(...)`
- `Type.Literal(...)`

That lowers your surface area a lot.

You might still provide:

- utilities
- wrappers
- transforms
- helpers around TypeBox

But don’t compete with TypeBox itself.

2.  Your value is the API builder, not schema primitives

Your unique part is now:

- `Api`
- `group`
- route builders
- chainable metadata
- macros
- docs
- source tracing
- OpenAPI normalization

That’s the real product.

Recommended route config shape

Use TypeBox schemas in clear object slots:

ts







``` shiki
stores.get("/{id}", {
  params: T.Object({
    id: T.String(),
  }),
  query: T.Object({
    expand: T.Optional(T.String()),
  }),
  response: Store,
});
```

For more advanced responses, use explicit status maps:

ts







``` shiki
stores.get("/{id}", {
  params: T.Object({
    id: T.String(),
  }),
  responses: {
    200: Store,
    404: T.Object({
      message: T.String(),
    }),
  },
});
```

This is better than a single `response` once the API grows.

Strong recommendation: support both `response` and `responses`

Simple case:

ts







``` shiki
response: Store
```

Advanced case:

ts







``` shiki
responses: {
  200: Store,
  404: NotFound,
  401: Unauthorized,
}
```

Then chaining can enrich these.

Chainable builder design with TypeBox

ts







``` shiki
stores
  .get("/{id}", {
    params: T.Object({
      id: T.String(),
    }),
    response: Store,
  })
  .summary("Read store")
  .description("Fetch a store by ID")
  .operationId("readStore")
  .tag("Stores")
  .security("bearer")
  .error(404, NotFound)
  .example("success", {
    name: "Corner Shop",
    address: {
      street: "Main",
      city: "NYC",
    },
  });
```

This is exactly where chaining shines:

- TypeBox handles the schema body
- chaining handles OpenAPI’s giant long tail

Suggested core API

Top-level

- `new Api(name, options?)`
- `api.group(path, cb)`
- `api.tag(name, meta?)`
- `api.securityScheme(name, scheme)`
- `api.server(url, options?)`
- `api.use(macro)`
- `api.emit(path, options?)`
- `api.docs(pathOrOptions)`

Group

- `group.get(path, config)`
- `group.post(path, config)`
- `group.put(path, config)`
- `group.patch(path, config)`
- `group.delete(path, config)`
- `group.options(path, config)`
- `group.head(path, config)`
- `group.trace(path, config)`
- `group.group(path, cb)`
- `group.use(macro)`
- `group.tag(name)`
- `group.security(name)`
- `group.description(text)`

Route chain methods

- `.summary(text)`
- `.description(text)`
- `.tag(name)`
- `.tags(...names)`
- `.operationId(id)`
- `.deprecated()`
- `.security(name)`
- `.server(url)`
- `.response(status, schema)`
- `.error(status, schema)`
- `.header(name, schema, options?)`
- `.example(name, value)`
- `.examples(record)`
- `.contentType(type, schema)`
- `.link(...)`
- `.callback(...)`
- `.doc(markdownOrMdx)`
- `.extension(name, value)`
- `.use(macro)`

TypeBox-specific helper layer

Even if you use TypeBox directly, you should still add convenience
helpers around common API patterns.

Useful helpers:

- `params({...})`
- `query({...})`
- `headers({...})`
- `json(schema)`
- `multipart({...})`
- `paginated(schema)`
- `envelope(schema)`
- `errorSchema(...)`
- `created(schema)`
- `noContent()`

Example:

ts







``` shiki
import { Type as T } from "@sinclair/typebox";
import { paginated, envelope, idParams } from "@your/api/helpers";

const User = T.Object({
  id: T.String(),
  email: T.String({ format: "email" }),
});

users.get("/", {
  query: T.Object({
    search: T.Optional(T.String()),
  }),
  response: paginated(envelope(User)),
});

users.get("/{id}", {
  params: idParams(),
  response: envelope(User),
});
```

This is a better place for your abstraction than replacing TypeBox.

Important implementation note: JSON Schema vs OpenAPI Schema

Because TypeBox emits JSON Schema, you’ll need a normalization layer.

That layer should handle:

- OpenAPI 3.0 vs 3.1 differences
- component extraction
- `$ref` hoisting
- nullable handling
- file/binary mappings
- content/media type wrapping
- parameter vs requestBody placement

This is important because:

- JSON Schema is close to OpenAPI 3.1
- but OpenAPI still has structure around it that isn’t “just schema”

So your emitter pipeline likely looks like:

- DSL AST
- collect TypeBox schemas
- hoist/dedupe named schemas
- normalize into OpenAPI schema objects
- emit YAML/JSON
- emit source map

A nice addition: named schemas/components

You may want a way to explicitly register names for cleaner component
output.

For example:

ts







``` shiki
const Store = api.schema(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

or:

ts







``` shiki
const Store = named(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

Why this matters:

- TypeBox alone won’t necessarily give you stable component names
- OpenAPI output benefits a lot from predictable schema names

This is probably worth adding.

Example:

ts







``` shiki
const Address = api.schema(
  "Address",
  T.Object({
    street: T.String(),
    city: T.String(),
  })
);

const Store = api.schema(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

Macros still absolutely fit

TypeBox doesn’t reduce the need for macros at all.

Macros should operate on:

- routes
- groups
- api instances
- maybe schema wrappers

Examples

Auth macro:

ts







``` shiki
const authed = macro.route((route) =>
  route.security("bearer").error(
    401,
    T.Object({
      message: T.String(),
    })
  )
);
```

Pagination helper:

ts







``` shiki
function paginated<T extends TSchema>(item: T) {
  return T.Object({
    items: T.Array(item),
    total: T.Integer(),
    page: T.Integer(),
    pageSize: T.Integer(),
  });
}
```

Envelope helper:

ts







``` shiki
function envelope<T extends TSchema>(schema: T) {
  return T.Object({
    data: schema,
    meta: T.Object({
      requestId: T.String(),
    }),
  });
}
```

Error-set macro:

ts







``` shiki
const standardErrors = macro.route((route) =>
  route
    .error(
      400,
      T.Object({ message: T.String() })
    )
    .error(
      500,
      T.Object({ message: T.String() })
    )
);
```

MDX docs still fit very well

This part remains unchanged and is still compelling.

Because your docs should come from the internal AST, not the YAML.

Example:

ts







``` shiki
stores
  .get("/{id}", {
    params: T.Object({
      id: T.String(),
    }),
    response: Store,
  })
  .summary("Read store")
  .doc(`
Returns a single store by its identifier.

## Notes

- Requires authentication
- Returns 404 when not found
`);
```

Then:

ts







``` shiki
api.docs({
  outDir: "docs",
  format: "mdx",
});
```

You can also support schema docs:

ts







``` shiki
const Store = api.schema(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
).description("A physical or virtual store");
```

Contract/type export story with TypeBox

This gets simpler.

Since TypeBox already provides `Static<typeof Schema>`, you can derive
types directly.

Example:

ts







``` shiki
type Store = Static<typeof StoreSchema>;
```

For routes, you can expose helpers like:

ts







``` shiki
type GetStore = RouteTypes<typeof getStore>;
```

Where `RouteTypes` yields:

ts







``` shiki
{
  params: { id: string };
  query: {};
  body: never;
  responses: {
    200: Store;
    404: { message: string };
  };
}
```

This is probably the cleanest way to keep runtime separate while still
exporting contracts.

Suggested concise product description

Your library is:

- a TypeScript-native OpenAPI authoring DSL
- powered by TypeBox for schemas
- using objects, callbacks, chaining, and macros
- that emits OpenAPI, MDX docs, and type contracts

Updated feature list with TypeBox in mind

Core

- TypeBox as the schema/input layer
- object-based route config
- callback-based grouping
- chainable route/group enrichment
- OpenAPI YAML/JSON emit
- MDX doc generation
- macros/helpers
- type contract exports

Schema-related

- named schema registration for stable OpenAPI components
- TypeBox schema hoisting into `components.schemas`
- TypeBox static type export via `Static<>`
- helper transforms/wrappers around TypeBox
- circular ref support where feasible
- schema deduplication and stable naming

Route-related

- params/query/headers/body/response slots
- single-response and multi-response forms
- content-type aware request/response definitions
- automatic operationId generation
- tag/security/server inheritance
- path param validation against route strings

OpenAPI ergonomics

- links
- callbacks
- vendor extensions
- examples
- multipart/form-data helpers
- serialization style helpers
- multiple media types
- deprecation metadata
- server variables
- security composition

Composition

- route macros
- group macros
- resource macros
- shared response/error presets
- pagination/envelope helpers
- spec composition across modules

Docs/devex

- MDX emit from AST
- source tracing/source maps
- explain/debug tooling
- unused schema detection
- diffing/breaking change checks

My strongest recommendation

Now that TypeBox is in the picture, do not build a custom schema DSL
unless absolutely necessary.

Instead:

- build the best API composition DSL
- make TypeBox feel first-class
- add a thin helper layer where API-specific ergonomics matter
- focus your innovation on:
  - chaining
  - macros
  - docs
  - component naming
  - source mapping
  - contract exports
  - advanced OpenAPI composition

If you want, I can next rewrite the distilled design into:

- a clean README-style vision
- an MVP API proposal with exact TypeScript signatures
- or a sample end-to-end example using `Api + TypeBox + macros + MDX`





Retry

GPT-5.4 (low)

GPT-5.4 (low)

66.09
tok/sec

2978
tokens

Time-to-First:
0.90 sec

Your message:

to be simpler i will just target the latest openapi 3.1





GPT-5.4

\$\$\$

Low

Search

Attach

Retry







Assistant Reply:

That simplifies things a lot, and it’s a very good decision.

Targeting only OpenAPI 3.1 gives you major advantages:

- JSON Schema alignment is much better
- TypeBox fits more naturally
- fewer compatibility hacks
- less emitter complexity
- fewer edge cases around nullable and schema differences
- cleaner mental model for users

Why this is a strong choice

OpenAPI 3.0 has awkward differences from JSON Schema, which would make a
TypeBox-based system annoying:

- `nullable` quirks
- schema keyword mismatches
- partial JSON Schema compatibility
- extra translation logic

OpenAPI 3.1 is much closer to modern JSON Schema, so your pipeline
becomes more honest:

- TypeBox schema
- normalized into OpenAPI 3.1 schema locations
- emitted directly

That means your library can stay focused on:

- API composition
- route modeling
- docs
- macros
- source maps
- type exports

instead of spending energy on schema compatibility shims.

Updated distilled vision

Your library is:

- a TypeScript-native OpenAPI 3.1 authoring library
- using TypeBox for schema definitions
- using objects, route callbacks, chaining, and macros
- emitting:
  - OpenAPI 3.1
  - MDX docs
  - optional source trace metadata
  - route contract types

Best concise positioning

- OpenAPI 3.1 only
- TypeBox-native
- object-based
- chainable
- callback-composed
- macro-friendly
- docs-first
- no custom schema language

Refined architecture

- TypeBox defines schemas
- your DSL defines API structure
- internal AST stores:
  - paths
  - operations
  - metadata
  - schema references
  - docs content
  - source locations
- emitters produce:
  - `openapi.yaml`
  - `openapi.json`
  - `*.mdx`
  - optional mapping/debug files

This is now much cleaner.

Recommended authoring style

ts







``` shiki
import { Type as T } from "@sinclair/typebox";
import { Api } from "@your/api";

const api = new Api("Store API", {
  version: "1.0.0",
  openapi: "3.1.0",
});

const Address = api.schema(
  "Address",
  T.Object({
    street: T.String(),
    city: T.String(),
  })
);

const Store = api.schema(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);

api.group("/stores", (stores) => {
  stores
    .get("/", {
      query: T.Object({
        filter: T.Optional(T.String()),
      }),
      response: T.Array(Store),
    })
    .summary("List stores")
    .tag("Stores");

  stores
    .get("/{id}", {
      params: T.Object({
        id: T.String(),
      }),
      response: Store,
    })
    .summary("Read store")
    .tag("Stores");
});

api.emit("openapi.yaml");
api.docs("docs/api.mdx");
```

What becomes easier by standardizing on 3.1

- TypeBox integration
- unions and nullability
- schema keyword preservation
- less custom conversion logic
- better support for modern JSON Schema features
- fewer “OpenAPI but not really JSON Schema” surprises

What your library should now avoid

Since you are 3.1-only, I would avoid:

- OpenAPI 3.0 compatibility mode
- special backports for old generators
- alternate schema emit paths unless absolutely necessary
- a parallel custom schema abstraction

That will keep the API cleaner.

Good design principles from this decision

- Prefer direct use of TypeBox schemas
- Prefer explicit OpenAPI 3.1 output
- Prefer composition over compatibility
- Prefer simple route objects plus chaining
- Prefer a strong AST over ad hoc YAML generation

Updated distilled feature summary

Core design

- OpenAPI 3.1 only
- TypeBox-native schema input
- object-based route definitions
- route/group callbacks
- chainable metadata enrichment
- macros for reuse
- MDX documentation generation

Core API

- `new Api(...)`
- `api.schema(name, schema)`
- `api.group(path, cb)`
- `group.get/post/put/patch/delete/...`
- `route.summary/description/tag/security/error/example/doc/...`
- `api.emit(...)`
- `api.docs(...)`

Still-valuable advanced features

- automatic component hoisting
- stable schema naming
- path param validation from route strings
- route contract type exports
- response-by-status modeling
- pagination/envelope helpers
- auth/error macros
- source trace maps from emitted YAML/JSON back to TS
- modular composition across files
- policy enforcement
- operationId generation
- diffing / breaking change checks

A very short product statement

You could describe it as:

- A TypeScript-first OpenAPI 3.1 builder using TypeBox, with chainable
  route definitions, macros, and MDX doc generation.

Or more simply:

- Pulumi-style OpenAPI 3.1 authoring for TypeScript, powered by TypeBox.

One subtle recommendation

Even though you only target 3.1, still normalize schemas through an
internal schema/reference layer rather than embedding raw objects
everywhere.

Why:

- lets you dedupe schemas
- lets you assign stable component names
- makes source tracing easier
- makes MDX/schema docs easier
- gives room for plugins/macros later

So internally:

- keep TypeBox as input
- but convert to your own normalized schema node/reference model before
  emission

That’s not replacing TypeBox; it’s just making emission sane.

Bulleted list of other features suggested

- Stable named schema registration
- Automatic `components.schemas` hoisting
- Schema deduplication
- Path parameter validation from route templates
- Exact matching between path params and param schema keys
- Route contract type exports
- Multi-status typed responses
- Macros for auth, pagination, envelopes, errors
- Resource/CRUD helpers
- Shared parameter/query/header helpers
- Automatic operationId generation
- Group-level tags/security inheritance
- Multiple media type support
- Multipart/form-data helpers
- Parameter serialization style helpers
- Callbacks support
- Links support
- Vendor extension support
- Environment-specific spec emission
- Public/internal spec filtering
- Versioning/deprecation helpers
- MDX docs generation from AST
- Long-form per-route docs
- Example generation/validation
- Source maps / traceability from spec back to TS
- Explain/debug CLI tooling
- Unused schema detection
- Breaking change diffing
- Modular API composition
- Collision detection for paths and schema names
- Optional framework-agnostic contract exports
- Optional runtime adapters later, if desired

If you want, I can next turn all of this into a concise design doc with
sections like:

- goals
- non-goals
- core API
- architecture
- MVP
- future ideas





Retry

GPT-5.4 (low)

GPT-5.4 (low)

60.27
tok/sec

1481
tokens

Time-to-First:
1.2 sec

Your message:

OpenAPI 3.1.0 and later: Fully realigned with the latest JSON Schema
standard (Draft 2020-12), eliminating previous inconsistencies and
allowing for direct use of standard JSON Schema tools and resources.  
Swagger  
Swagger  
+3





GPT-5.4

\$\$\$

Low

Search

Attach

Retry







Assistant Reply:

Exactly — that’s the key reason your TypeBox choice and OpenAPI 3.1 fit
so well.

The important takeaway is:

- OpenAPI 3.1 uses JSON Schema much more directly
- so your library can treat TypeBox as a first-class schema source
- instead of “translating into OpenAPI-ish schema,” you’re mostly
  placing standard JSON Schema into OpenAPI document structure

That’s a huge simplification.

What this means for your design

- You do not need a custom schema language
- You do not need a heavy JSON Schema compatibility shim
- You can rely on standard JSON Schema concepts more confidently
- Your main job becomes:
  - organizing operations
  - wiring schemas into parameters/request bodies/responses
  - hoisting components
  - naming refs
  - generating docs
  - supporting macros/chaining

So your architecture becomes cleaner:

- TypeBox = schema authoring
- your DSL = API composition
- OpenAPI 3.1 = output format

This is the right separation of concerns.

Practical implication

Your library is not really a schema builder anymore.

It is more like:

- an OpenAPI 3.1 document builder
- with a TypeScript DSL
- powered by TypeBox schemas
- plus docs/macros/source-tracing

That’s a better product story.

A sharper product description

You could describe it as:

- A TypeScript DSL for composing OpenAPI 3.1 specs with TypeBox, route
  builders, macros, and MDX docs.

Or:

- A code-first OpenAPI 3.1 builder for TypeScript that uses TypeBox for
  schemas and emits specs, docs, and contract metadata.

What you now get “for free” conceptually

Compared with older OpenAPI versions, 3.1 makes these feel much more
natural:

- unions
- nullability
- standard JSON Schema keywords
- schema reuse with standard tooling
- easier validation/debugging with JSON Schema-aware tools
- less weirdness in schema emission

So yes — your instinct is correct:  
this alignment is a major enabler for your design.

What remains your responsibility

Even with 3.1, your library still has to solve the non-schema parts of
OpenAPI:

- path/operation modeling
- parameters vs requestBody
- status-code-based responses
- media type wrapping
- component registration
- operationId generation
- tags/security/servers
- callbacks/links/extensions
- docs generation
- macros/composition
- source maps / explainability

That’s actually good news, because those are the painful authoring
problems you want to improve.

A clean distilled statement

Your library should lean into this idea:

- “Use TypeBox for schemas because OpenAPI 3.1 finally makes that sane.”
- “Use our DSL for everything OpenAPI itself makes awkward: routes,
  reuse, metadata, macros, and docs.”

That’s probably the cleanest possible framing.

If you want, I can now turn everything we discussed into a polished:

- project vision statement
- README intro
- or first-pass API design proposal.





Retry

GPT-5.4 (low)

GPT-5.4 (low)

57.10
tok/sec

652
tokens

Time-to-First:
1.1 sec

Your message:

const Store = api.schema(  
"Store",  
T.Object({  
name: T.String(),  
address: Address,  
})  
);, this is cool i guess but i am interested in possibly reusable
json-schema typebox types





GPT-5.4

\$\$\$

Low

Search

Attach

Retry







### Reasoning

Assistant Reply:

Yes — that makes sense, and I think it’s the better direction.

If you want reusable TypeBox/JSON-Schema types, then
`api.schema("Store", ...)` should probably be optional, not the primary
way people define models.

Better mental model

- schemas should be plain reusable TypeBox values
- the API layer should consume them
- naming/registration for OpenAPI components should be additive

So instead of this:

ts







``` shiki
const Store = api.schema(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

you probably want this:

ts







``` shiki
const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

const Store = T.Object({
  name: T.String(),
  address: Address,
});
```

and then use them directly:

ts







``` shiki
api.group("/stores", (stores) => {
  stores.get("/{id}", {
    params: T.Object({
      id: T.String(),
    }),
    response: Store,
  });
});
```

That keeps schemas:

- reusable outside your API lib
- usable with validators
- usable in other JSON Schema contexts
- not coupled to your OpenAPI builder

That’s likely the right default.

What `api.schema()` should become

If you keep `api.schema()`, I would make it about registration/naming,
not schema creation.

For example:

ts







``` shiki
const Store = T.Object({
  name: T.String(),
  address: Address,
});

api.schema("Store", Store);
api.schema("Address", Address);
```

That is much cleaner because:

- schema definition stays pure TypeBox
- API/OpenAPI naming is layered on afterward
- same schema can be reused across multiple APIs/specs
- your library does not “own” the schema object

This is a much stronger design.

Even better: support a standalone naming helper

You may not even want registration to require an `Api` instance.

For example:

ts







``` shiki
const Address = named(
  "Address",
  T.Object({
    street: T.String(),
    city: T.String(),
  })
);

const Store = named(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

Then later:

ts







``` shiki
stores.get("/{id}", {
  params: T.Object({
    id: T.String(),
  }),
  response: Store,
});
```

This would let your emitter detect:

- preferred component name
- reusable schema identity
- source info if you attach metadata

This is probably the nicest balance.

Best design principle here

Schema authoring should be independent.  
OpenAPI registration should be optional.

So:

- TypeBox defines the schema
- your library optionally adds metadata for:
  - component name
  - description/docs
  - examples
  - source tracing

That preserves reuse.

Recommended patterns

Option A: plain TypeBox only

ts







``` shiki
const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

const Store = T.Object({
  name: T.String(),
  address: Address,
});
```

Pros:

- simplest
- pure TypeBox
- fully reusable

Cons:

- component names may be harder to infer well

Option B: explicit registration

ts







``` shiki
const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

const Store = T.Object({
  name: T.String(),
  address: Address,
});

api.schema("Address", Address);
api.schema("Store", Store);
```

Pros:

- pure schema definitions
- explicit OpenAPI names
- reusable across APIs

This is my favorite practical option.

Option C: metadata wrapper

ts







``` shiki
const Address = named(
  "Address",
  T.Object({
    street: T.String(),
    city: T.String(),
  })
);

const Store = named(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);
```

Pros:

- reusable
- self-describing
- no need to separately register in every API if metadata travels with
  schema

Cons:

- requires attaching metadata to schema values somehow

This is elegant if implemented carefully.

A likely ideal API

I’d suggest supporting all three, but encouraging B or C.

Example:

ts







``` shiki
import { Type as T } from "@sinclair/typebox";
import { Api, named } from "@your/api";

const Address = named(
  "Address",
  T.Object({
    street: T.String(),
    city: T.String(),
  })
);

const Store = named(
  "Store",
  T.Object({
    name: T.String(),
    address: Address,
  })
);

const api = new Api("Store API");

api.group("/stores", (stores) => {
  stores.get("/{id}", {
    params: T.Object({
      id: T.String(),
    }),
    response: Store,
  });
});
```

Or explicit registration:

ts







``` shiki
const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

const Store = T.Object({
  name: T.String(),
  address: Address,
});

const api = new Api("Store API");

api.schema("Address", Address);
api.schema("Store", Store);
```

What “named” probably means internally

Since TypeBox schemas are plain objects, you could attach non-enumerable
metadata via a symbol.

Something like:

ts







``` shiki
const SchemaName = Symbol.for("your-lib:schema-name");

function named<T extends TSchema>(name: string, schema: T): T {
  Object.defineProperty(schema, SchemaName, {
    value: name,
    enumerable: false,
    configurable: false,
  });
  return schema;
}
```

Then your emitter can inspect:

- does this schema have a preferred name?
- has it already been hoisted?
- should it become a component ref?

That gives you reuse without wrapping everything in API-owned builders.

Why this is better for your goals

You said you want:

- existing TypeScript tooling
- elegant design
- TypeBox use
- reusable schemas

This aligns perfectly with that.

If schemas are plain TypeBox:

- they can live in shared packages
- they can be imported by clients, servers, validators, tests
- they can be used outside OpenAPI entirely
- your API DSL stays focused on routes/docs/macros

That’s a strong architecture.

Useful companion helpers

If you go this route, the most useful schema-related helpers are not
schema primitives but schema metadata helpers:

- `named(name, schema)`
- `describe(text, schema)` or chain-like metadata helper
- `example(value, schema)`
- `examples(record, schema)`
- `deprecated(schema)`
- `readonly(schema)`

Example:

ts







``` shiki
const Store = named(
  "Store",
  withExample(
    {
      name: "Corner Shop",
      address: {
        street: "Main",
        city: "NYC",
      },
    },
    T.Object({
      name: T.String(),
      address: Address,
    })
  )
);
```

Though I’d be careful not to overdo this if TypeBox already has suitable
options.

Practical recommendation

I would make the default pattern this:

ts







``` shiki
export const Address = T.Object({
  street: T.String(),
  city: T.String(),
});

export const Store = T.Object({
  name: T.String(),
  address: Address,
});
```

Then allow optional naming:

ts







``` shiki
api.schema("Address", Address);
api.schema("Store", Store);
```

or:

ts







``` shiki
export const Address = named("Address", T.Object({...}));
export const Store = named("Store", T.Object({...}));
```

That gives maximum reuse and minimal lock-in.

My recommendation in one sentence

Don’t make schemas belong to `api`; let them remain reusable TypeBox
schemas, and let your library optionally register or annotate them for
OpenAPI component naming.

If you want, I can next sketch:

- a minimal API for `named()`, `api.schema()`, and component hoisting
- or a full example showing reusable shared TypeBox schemas across
  multiple APIs.





Retry

GPT-5.4 (low)

GPT-5.4 (low)

70.60
tok/sec

1710
tokens

Time-to-First:
3.0 sec

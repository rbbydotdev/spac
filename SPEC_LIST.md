1. Vision
   - Define the library as a TypeScript-first OpenAPI 3.1 authoring DSL
   - Make TypeBox the schema input layer
   - Use objects, route callbacks, and chaining as the core authoring model
   - Make macros first-class
   - Make MDX doc generation first-class
   - Treat OpenAPI as output, not the authoring experience
   - Keep runtime integration optional
   - Keep contracts and composition as the primary focus

2. Scope
   - Target OpenAPI 3.1.0 only
   - Align fully with JSON Schema Draft 2020-12
   - Avoid OpenAPI 3.0 compatibility
   - Avoid building a custom schema DSL
   - Keep schemas reusable outside the API library

3. Core Authoring API
   - Implement `Api`
   - Implement `api.group(path, cb)`
   - Implement nested groups
   - Implement route builders for all HTTP methods
   - Support object-based route config
   - Support callback-based route assembly
   - Support chainable route metadata
   - Support chainable group metadata

4. Route Definition Shape
   - Support `params`
   - Support `query`
   - Support `headers`
   - Support `body`
   - Support `response`
   - Support `responses`
   - Support single-response shorthand
   - Support multi-status response maps
   - Support content-type-aware request definitions
   - Support content-type-aware response definitions

5. Route Chaining
   - Add `.summary()`
   - Add `.description()`
   - Add `.tag()`
   - Add `.tags()`
   - Add `.operationId()`
   - Add `.deprecated()`
   - Add `.security()`
   - Add `.server()`
   - Add `.response(status, schema)`
   - Add `.error(status, schema)`
   - Add `.header()`
   - Add `.example()`
   - Add `.examples()`
   - Add `.contentType()`
   - Add `.link()`
   - Add `.callback()`
   - Add `.doc()`
   - Add `.extension()`
   - Add `.use(macro)`

6. Group Chaining
   - Add `.tag()`
   - Add `.security()`
   - Add `.description()`
   - Add `.prefix()`
   - Add `.use(macro)`

7. Top-Level API Features
   - Add `api.tag()`
   - Add `api.securityScheme()`
   - Add `api.server()`
   - Add `api.use(macro)`
   - Add `api.emit()`
   - Add `api.docs()`

8. TypeBox Integration
   - Accept plain TypeBox schemas directly
   - Preserve reusable TypeBox schema values
   - Support `Static<typeof Schema>` workflows
   - Keep schema authoring independent from the API builder
   - Avoid replacing TypeBox primitives
   - Add thin API-specific helpers only where useful

9. Schema Registration and Naming
   - Support unnamed plain TypeBox schemas
   - Support explicit `api.schema(name, schema)` registration
   - Support `named(name, schema)` metadata annotation
   - Support stable schema component names
   - Support reusable schemas across multiple APIs
   - Support component naming without coupling schema creation to `Api`

10. Schema Metadata Helpers
   - Support schema descriptions
   - Support schema examples
   - Support schema deprecation metadata
   - Support schema titles where useful
   - Support metadata attachment without breaking TypeBox reuse

11. Internal Architecture
   - Build a DSL layer
   - Build an internal AST
   - Normalize routes, groups, schemas, docs, and metadata into the AST
   - Add a transform layer for macros and policy enforcement
   - Add an emitter layer for OpenAPI and MDX
   - Add optional source tracing metadata
   - Keep schema normalization separate from direct emission

12. OpenAPI Emission
   - Emit `openapi.json`
   - Emit `openapi.yaml`
   - Hoist reusable schemas into `components.schemas`
   - Generate `$ref` links
   - Deduplicate schemas
   - Preserve OpenAPI 3.1 / JSON Schema semantics
   - Wrap request bodies correctly
   - Wrap responses correctly
   - Place parameters correctly
   - Support multiple media types


14. Macros
   - Support route macros
   - Support group macros
   - Support API-level macros
   - Support resource macros
   - Support reusable auth macros
   - Support reusable standard error macros
   - Support pagination macros/helpers
   - Support envelope macros/helpers
   - Support shared headers macros
   - Support shared query param macros
   - Support organization convention macros

15. Helper Utilities
   - Add `params(...)` helpers
   - Add `query(...)` helpers
   - Add `headers(...)` helpers
   - Add `json(schema)` helpers
   - Add `multipart(...)` helpers
   - Add `paginated(schema)` helpers
   - Add `envelope(schema)` helpers
   - Add `errorSchema(...)` helpers
   - Add `created(schema)` helpers
   - Add `noContent()` helpers

16. Type Exports and Contracts
   - Export schema-derived TypeScript types via TypeBox
   - Add route contract type helpers
   - Model responses by status code in types
   - Expose route input/output typing
   - Keep framework-agnostic contract generation possible

17. Validation and Safety
   - Validate path params against route templates
   - Infer path param names from `/{id}` patterns where possible
   - Enforce exact matching between path params and param schema keys
   - Detect path collisions
   - Detect schema naming collisions
   - Detect unused schemas
   - Support circular references where feasible

18. OpenAPI Advanced Features
   - Support links
   - Support callbacks
   - Support vendor extensions
   - Support multipart/form-data
   - Support parameter serialization styles
   - Support request body encoding helpers
   - Support multiple media types
   - Support server variables
   - Support security composition semantics

19. Composition and Modularity
   - Support spec composition across files
   - Support reusable shared schema packages
   - Support reusable shared macro packages
   - Support modular groups and route trees
   - Support public/internal spec filtering
   - Support environment-specific spec emission

20. Naming and Stability
   - Ensure stable component naming
   - Ensure stable deduplication behavior
   - Ensure refactor-safe schema reuse
   - Ensure predictable operationId generation

21. Policy and Tooling
   - Add spec-wide policy enforcement
   - Add operationId generation strategies
   - Add automatic tagging strategies
   - Add example validation
   - Add source maps from emitted spec back to TypeScript
   - Add explain/debug tooling
   - Add semantic diffing
   - Add breaking change detection

22. Resource Patterns
   - Support CRUD/resource helpers
   - Support model registration for resources
   - Support ID schema helpers
   - Support common collection/detail route patterns

23. MVP
   - Implement `Api`
   - Implement `group(path, cb)`
   - Implement HTTP method builders
   - Support TypeBox schemas directly
   - Support `params`, `query`, `body`, `response`, `responses`
   - Support route chaining for summary, description, tags, errors
   - Emit OpenAPI YAML/JSON
   - Hoist components automatically
   - Implement basic macros

24. Next Phase
   - Add advanced chaining methods
   - Add schema naming helpers
   - Add MDX docs emission
   - Add operationId generation
   - Add path param validation
   - Add route contract type helpers
   - Add helper utilities for common API patterns

25. Later Phase
   - Add source tracing
   - Add callbacks and links ergonomics
   - Add multipart encoding helpers
   - Add serialization helpers
   - Add advanced security composition
   - Add public/internal filtering
   - Add diffing and breaking change checks
   - Add optional client or SDK generation
   - Add optional contract testing hooks
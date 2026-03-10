# Typed Path Params — Group Inheritance Problem

## Issue

The `RouteConfig<P>` type extracts path params from the route's own path string and enforces that `params` matches. But when a group prefix contains path params (e.g. `/zones/{zone_id}/dns_records`), child routes need those params too — yet the type system only sees the route-level path.

## Current behavior

```ts
api.group('/zones/{zone_id}/dns_records', (g) => {
  // TS error: route path is '/', which has no params, so params must be undefined
  g.get('/', {
    params: Type.Object({ zone_id: Identifier }), // ❌ not allowed
  })

  // TS error: route path is '/{dns_record_id}', expects only dns_record_id
  g.get('/{dns_record_id}', {
    params: Type.Object({ zone_id: Identifier, dns_record_id: Identifier }), // ❌ zone_id not expected
  })
})
```

## Desired behavior

- Group-level path params should be defined once at the group level
- Child routes should only define their own new params
- The emitter should merge group params + route params for the OpenAPI output

## Ideas

1. **Group-level params**: `api.group('/zones/{zone_id}/dns_records', { params: Type.Object({ zone_id: Identifier }) }, (g) => { ... })`
2. **Type-level composition**: Make `GroupBuilder` generic on its prefix, and compose `ExtractPathParams<GroupPrefix> | ExtractPathParams<RoutePath>` for the full param set
3. **Separate concerns**: Groups only define prefix + metadata; params always live on routes but the type constraint accounts for inherited group params

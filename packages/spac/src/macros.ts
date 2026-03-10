import type { RouteMacro, GroupMacro, ApiMacro } from './types'

/**
 * Create a route-level macro — a reusable function that configures a {@link RouteBuilder}.
 * Apply it to routes via `.use()`. Multiple macros can be composed by chaining `.use()` calls.
 *
 * @param fn - A function that receives a {@link RouteBuilder} and configures it.
 * @returns The same function, typed as a {@link RouteMacro}.
 *
 * @example
 * ```ts
 * // Auth macro: adds bearer security + 401/403 error responses
 * const authenticated = macro.route(r =>
 *   r.security('bearer').error(401, Error).error(403, Error)
 * )
 *
 * // Validation macro: adds 422 error response
 * const validated = macro.route(r => r.error(422, DetailedError))
 *
 * // Compose macros on a route
 * api.post('/pets', { body: CreatePet, response: Pet })
 *   .use(authenticated)
 *   .use(validated)
 * ```
 */
function route(fn: RouteMacro): RouteMacro {
  return fn
}

/**
 * Create a group-level macro — a reusable function that configures a {@link GroupBuilder}.
 * Apply it inside a group callback via `.use()`.
 *
 * @param fn - A function that receives a {@link GroupBuilder} and configures it.
 * @returns The same function, typed as a {@link GroupMacro}.
 *
 * @example
 * ```ts
 * const adminSection = macro.group(g =>
 *   g.tag('admin').security({ bearerAuth: ['admin'] })
 * )
 *
 * api.group('/admin', g => {
 *   g.use(adminSection)
 *   g.get('/stats', { response: StatsResponse })
 * })
 * ```
 */
function group(fn: GroupMacro): GroupMacro {
  return fn
}

/**
 * Create an API-level macro — a reusable function that configures an {@link Api}.
 * Apply it via `api.use()`.
 *
 * @param fn - A function that receives an {@link Api} and configures it.
 * @returns The same function, typed as an {@link ApiMacro}.
 *
 * @example
 * ```ts
 * const withServers = macro.api(a =>
 *   a.server({ url: 'https://api.example.com/v1', description: 'Production' })
 *    .server({ url: 'https://staging.example.com/v1', description: 'Staging' })
 * )
 *
 * const api = new Api('My API')
 * api.use(withServers)
 * ```
 */
function api(fn: ApiMacro): ApiMacro {
  return fn
}

/**
 * Factory for creating reusable macros at route, group, and API levels.
 * Macros encapsulate common configuration patterns and are applied via `.use()`.
 *
 * @example
 * ```ts
 * import { macro } from 'spac'
 *
 * const authed = macro.route(r => r.security('bearer').error(401, Error))
 * const adminGroup = macro.group(g => g.tag('admin').security('bearer'))
 * const withServers = macro.api(a => a.server({ url: 'https://api.example.com' }))
 * ```
 */
export const macro = { route, group, api } as const

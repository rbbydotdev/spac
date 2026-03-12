// Core
export { Api } from './api'
export type { ApiConfig } from './types'

// Builders
export { RouteBuilder } from './route'
export { GroupBuilder } from './group'

// Schema naming
export { named, getSchemaName } from './schema'

// Emission
export { emitOpenApi } from './emit'

// Debug source map
export { crc32, objectPath, lookup, vlqEncode, buildV3SourceMap, serializeJsonWithPositions } from './debug'
export type { EmitOptions, EmitDebugResult, V3SourceMap, V3Mapping, JsonPositions } from './debug'

// Helpers
export { json, noContent, created, errorSchema, paginated, envelope } from './helpers'

// Macros
export { macro } from './macros'

// Types
export type {
  HttpMethod,
  ExtractPathParams,
  SafeRoutePath,
  RouteConfig,
  GroupConfig,
  GroupCallArgs,
  ResponseDef,
  ServerConfig,
  ServerVariableConfig,
  SecurityRequirement,
  SecuritySchemeConfig,
  OAuthFlowsConfig,
  OAuthFlowConfig,
  TagConfig,
  RouteMacro,
  GroupMacro,
  ApiMacro,
  SrcLoc,
  ConfigSrcMeta,
} from './types'

// Validation (from the OAS 3.1 spec validators)
export type { ValidationResult } from './validate'
export {
  validateOpenApiObject,
  validateInfoObject,
  validateContactObject,
  validateLicenseObject,
  validateServerObject,
  validateServerVariableObject,
  validateComponentsObject,
  validatePathsObject,
  validatePathItemObject,
  validateOperationObject,
  validateExternalDocumentationObject,
  validateParameterObject,
  validateRequestBodyObject,
  validateMediaTypeObject,
  validateEncodingObject,
  validateResponsesObject,
  validateResponseObject,
  validateCallbackObject,
  validateExampleObject,
  validateLinkObject,
  validateHeaderObject,
  validateTagObject,
  validateReferenceObject,
  validateSchemaObject,
  validateDiscriminatorObject,
  validateXmlObject,
  validateSecuritySchemeObject,
  validateOAuthFlowsObject,
  validateOAuthFlowObject,
  validateSecurityRequirementObject,
} from './validate'

// Core
export { Api } from "./api";
export type {
  ApiConfig,
  SpecVersion,
  VersionCapabilities,
  VersionPolicy,
  VersionDeclaration,
  VersionAudit,
  VersionComparison,
} from "./types";
export { versionCapabilities, parseVersion, compareVersions } from "./types";

// Builders
export { RouteBuilder } from "./route";
export { GroupBuilder } from "./group";

// Schema naming
export { named, getSchemaName } from "./schema";

// Source mapping
export {
  captureSource,
  prepareSourceMap,
  serializeSourceTable,
} from "./sourcemap";
export type {
  SourceLocation,
  SourceEntry,
  SourceEntryKind,
  SourceTable,
  PrepareSourceMapOptions,
  SerializedSourceEntry,
} from "./sourcemap";

// Emission
export { emitOpenApi } from "./emit";
export type { EmitOptions, EmitResult } from "./emit";

// Helpers
export {
  json,
  noContent,
  created,
  errorSchema,
  paginated,
  envelope,
} from "./helpers";

// Macros
export { macro } from "./macros";

// Types
export type {
  HttpMethod,
  StatusCode,
  ExtractPathParams,
  SafeRoutePath,
  GroupConfig,
  GroupCallArgs,
  ResponseDef,
  LinkConfig,
  ServerConfig,
  ServerVariableConfig,
  SecurityRequirement,
  SecuritySchemeConfig,
  OAuthFlowsConfig,
  OAuthFlowConfig,
  TagConfig,
  ExampleConfig,
  HeaderConfig,
  ParameterConfig,
  EncodingConfig,
  RouteMacro,
  GroupMacro,
  ApiMacro,
} from "./types";

// Validation (from the OAS 3.1 spec validators)
export type { ValidationResult } from "./validate";
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
} from "./validate";

export interface ValidationResult {
  valid: boolean
  errors: string[]
}

// ---------------------------------------------------------------------------
// Internal Helpers
// ---------------------------------------------------------------------------

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

function isStr(v: unknown): v is string {
  return typeof v === 'string'
}

function isBool(v: unknown): v is boolean {
  return typeof v === 'boolean'
}

function isArr(v: unknown): v is unknown[] {
  return Array.isArray(v)
}

/** Permissive URI-reference check: non-empty string without whitespace. */
function isUriRef(v: unknown): boolean {
  return isStr(v) && v.length > 0 && !/\s/.test(v)
}

/** Absolute (non-relative) URI – must start with a scheme. */
function isAbsoluteUri(v: unknown): boolean {
  return isStr(v) && /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(v)
}

/** Minimal email check (contains @, dot after @, no spaces). */
function isEmail(v: unknown): boolean {
  return isStr(v) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

function ok(): ValidationResult {
  return { valid: true, errors: [] }
}

function fail(...errors: string[]): ValidationResult {
  return { valid: false, errors }
}

/** Returns error strings for any key not in `known` and not an x- extension. */
function unknownFieldErrors(obj: Record<string, unknown>, known: Set<string>): string[] {
  const errs: string[] = []
  for (const key of Object.keys(obj)) {
    if (!known.has(key) && !key.startsWith('x-')) {
      errs.push(`Unknown field: ${key}`)
    }
  }
  return errs
}

// ---------------------------------------------------------------------------
// 4.8.1 – OpenAPI Object
// ---------------------------------------------------------------------------

const OPENAPI_FIELDS = new Set([
  'openapi', 'info', 'jsonSchemaDialect', 'servers', 'paths',
  'webhooks', 'components', 'security', 'tags', 'externalDocs',
])

export function validateOpenApiObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('openapi' in data)) errors.push('Missing required field: openapi')
  else if (!isStr(data.openapi)) errors.push('openapi must be a string')
  else if (!/^3\.1\.\d+$/.test(data.openapi)) errors.push('openapi must be a valid 3.1.x version')

  if (!('info' in data)) errors.push('Missing required field: info')
  else if (!isObj(data.info)) errors.push('info must be an object')

  if ('jsonSchemaDialect' in data && !isUriRef(data.jsonSchemaDialect)) {
    errors.push('jsonSchemaDialect must be a URI')
  }
  if ('servers' in data && !isArr(data.servers)) errors.push('servers must be an array')
  if ('paths' in data && !isObj(data.paths)) errors.push('paths must be an object')
  if ('webhooks' in data && !isObj(data.webhooks)) errors.push('webhooks must be an object')
  if ('components' in data && !isObj(data.components)) errors.push('components must be an object')
  if ('security' in data && !isArr(data.security)) errors.push('security must be an array')

  if ('tags' in data) {
    if (!isArr(data.tags)) {
      errors.push('tags must be an array')
    } else {
      const names = new Set<string>()
      for (const tag of data.tags as unknown[]) {
        if (isObj(tag) && isStr(tag.name)) {
          if (names.has(tag.name)) errors.push(`Duplicate tag name: ${tag.name}`)
          names.add(tag.name)
        }
      }
    }
  }

  if ('externalDocs' in data && !isObj(data.externalDocs)) {
    errors.push('externalDocs must be an object')
  }

  errors.push(...unknownFieldErrors(data, OPENAPI_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.2 – Info Object
// ---------------------------------------------------------------------------

const INFO_FIELDS = new Set([
  'title', 'version', 'summary', 'description', 'termsOfService', 'contact', 'license',
])

export function validateInfoObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('title' in data)) errors.push('Missing required field: title')
  else if (!isStr(data.title)) errors.push('title must be a string')

  if (!('version' in data)) errors.push('Missing required field: version')
  else if (!isStr(data.version)) errors.push('version must be a string')

  if ('termsOfService' in data && !isUriRef(data.termsOfService)) {
    errors.push('termsOfService must be a URI')
  }
  if ('contact' in data && !isObj(data.contact)) errors.push('contact must be an object')
  if ('license' in data && !isObj(data.license)) errors.push('license must be an object')

  errors.push(...unknownFieldErrors(data, INFO_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.3 – Contact Object
// ---------------------------------------------------------------------------

const CONTACT_FIELDS = new Set(['name', 'url', 'email'])

export function validateContactObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('name' in data && !isStr(data.name)) errors.push('name must be a string')
  if ('url' in data && !isUriRef(data.url)) errors.push('url must be a URI')
  if ('email' in data && !isEmail(data.email)) errors.push('email must be a valid email')

  errors.push(...unknownFieldErrors(data, CONTACT_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.4 – License Object
// ---------------------------------------------------------------------------

const LICENSE_FIELDS = new Set(['name', 'identifier', 'url'])

export function validateLicenseObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('name' in data)) errors.push('Missing required field: name')
  else if (!isStr(data.name)) errors.push('name must be a string')

  if ('url' in data && !isUriRef(data.url)) errors.push('url must be a URI')
  if ('identifier' in data && 'url' in data) {
    errors.push('identifier and url are mutually exclusive')
  }

  errors.push(...unknownFieldErrors(data, LICENSE_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.5 – Server Object
// ---------------------------------------------------------------------------

const SERVER_FIELDS = new Set(['url', 'description', 'variables'])

export function validateServerObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('url' in data)) errors.push('Missing required field: url')
  else if (!isStr(data.url)) errors.push('url must be a string')
  else {
    if (data.url.includes('?')) errors.push('url must not contain query string')
    if (data.url.includes('#')) errors.push('url must not contain fragment')
  }

  if ('variables' in data && !isObj(data.variables)) errors.push('variables must be an object')

  errors.push(...unknownFieldErrors(data, SERVER_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.6 – Server Variable Object
// ---------------------------------------------------------------------------

const SERVER_VARIABLE_FIELDS = new Set(['default', 'enum', 'description'])

export function validateServerVariableObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('default' in data)) errors.push('Missing required field: default')
  else if (!isStr(data.default)) errors.push('default must be a string')

  if ('enum' in data) {
    if (!isArr(data.enum)) {
      errors.push('enum must be an array')
    } else {
      if (data.enum.length === 0) errors.push('enum must not be empty')
      if (!data.enum.every(v => isStr(v))) errors.push('enum values must be strings')
      if (isStr(data.default) && data.enum.length > 0 && !data.enum.includes(data.default)) {
        errors.push('default must be in enum')
      }
    }
  }

  errors.push(...unknownFieldErrors(data, SERVER_VARIABLE_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.7 – Components Object
// ---------------------------------------------------------------------------

const COMPONENT_KEY_RE = /^[a-zA-Z0-9.\-_]+$/
const COMPONENTS_FIELDS = new Set([
  'schemas', 'responses', 'parameters', 'examples', 'requestBodies',
  'headers', 'securitySchemes', 'links', 'callbacks', 'pathItems',
])

export function validateComponentsObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  for (const field of COMPONENTS_FIELDS) {
    if (field in data) {
      if (!isObj(data[field])) {
        errors.push(`${field} must be an object`)
      } else {
        for (const key of Object.keys(data[field] as Record<string, unknown>)) {
          if (!COMPONENT_KEY_RE.test(key)) {
            errors.push(`Invalid component key: ${key}`)
          }
        }
      }
    }
  }

  errors.push(...unknownFieldErrors(data, COMPONENTS_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.8 – Paths Object
// ---------------------------------------------------------------------------

export function validatePathsObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  const normalizedPaths = new Map<string, string>()

  for (const key of Object.keys(data)) {
    if (key.startsWith('x-')) continue
    if (!key.startsWith('/')) {
      errors.push(`Path must start with /: ${key}`)
      continue
    }
    const normalized = key.replace(/\{[^}]+\}/g, '{_}')
    if (normalizedPaths.has(normalized)) {
      errors.push(`Duplicate templated path: ${key} conflicts with ${normalizedPaths.get(normalized)}`)
    } else {
      normalizedPaths.set(normalized, key)
    }
  }

  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.9 – Path Item Object
// ---------------------------------------------------------------------------

const PATH_ITEM_FIELDS = new Set([
  '$ref', 'summary', 'description', 'get', 'put', 'post', 'delete',
  'options', 'head', 'patch', 'trace', 'servers', 'parameters',
])

export function validatePathItemObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  errors.push(...unknownFieldErrors(data, PATH_ITEM_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.10 – Operation Object
// ---------------------------------------------------------------------------

const OPERATION_FIELDS = new Set([
  'tags', 'summary', 'description', 'externalDocs', 'operationId',
  'parameters', 'requestBody', 'responses', 'callbacks', 'deprecated',
  'security', 'servers',
])

export function validateOperationObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('responses' in data)) errors.push('Missing required field: responses')
  else if (!isObj(data.responses)) errors.push('responses must be an object')

  if ('tags' in data && !isArr(data.tags)) errors.push('tags must be an array')
  if ('deprecated' in data && !isBool(data.deprecated)) errors.push('deprecated must be a boolean')

  if ('parameters' in data && isArr(data.parameters)) {
    const seen = new Set<string>()
    for (const param of data.parameters as unknown[]) {
      if (isObj(param) && isStr(param.name) && isStr(param.in)) {
        const key = `${param.name}:${param.in}`
        if (seen.has(key)) errors.push(`Duplicate parameter: ${param.name} in ${param.in}`)
        seen.add(key)
      }
    }
  }

  errors.push(...unknownFieldErrors(data, OPERATION_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.11 – External Documentation Object
// ---------------------------------------------------------------------------

const EXTERNAL_DOCS_FIELDS = new Set(['url', 'description'])

export function validateExternalDocumentationObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('url' in data)) errors.push('Missing required field: url')
  else if (!isUriRef(data.url)) errors.push('url must be a URI')

  errors.push(...unknownFieldErrors(data, EXTERNAL_DOCS_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.12 – Parameter Object
// ---------------------------------------------------------------------------

const PARAMETER_FIELDS = new Set([
  'name', 'in', 'description', 'required', 'deprecated', 'allowEmptyValue',
  'style', 'explode', 'allowReserved', 'schema', 'content', 'example', 'examples',
])

const PATH_STYLES = new Set(['simple', 'label', 'matrix'])
const QUERY_STYLES = new Set(['form', 'spaceDelimited', 'pipeDelimited', 'deepObject'])
const HEADER_STYLES = new Set(['simple'])
const COOKIE_STYLES = new Set(['form'])
const ALL_STYLES = new Set([...PATH_STYLES, ...QUERY_STYLES, ...HEADER_STYLES, ...COOKIE_STYLES])

const STYLE_MAP: Record<string, Set<string>> = {
  path: PATH_STYLES,
  query: QUERY_STYLES,
  header: HEADER_STYLES,
  cookie: COOKIE_STYLES,
}

export function validateParameterObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('name' in data)) errors.push('Missing required field: name')
  else if (!isStr(data.name)) errors.push('name must be a string')

  if (!('in' in data)) errors.push('Missing required field: in')
  else if (!isStr(data.in)) errors.push('in must be a string')
  else if (!['path', 'query', 'header', 'cookie'].includes(data.in)) {
    errors.push('in must be one of: path, query, header, cookie')
  }

  // Path params must have required: true
  if (isStr(data.in) && data.in === 'path') {
    if (data.required !== true) errors.push('Path parameters must have required: true')
  }

  // schema vs content – mutually exclusive but one is required
  const hasSchema = 'schema' in data
  const hasContent = 'content' in data
  if (hasSchema && hasContent) errors.push('schema and content are mutually exclusive')
  if (!hasSchema && !hasContent) errors.push('Must have either schema or content')

  if (hasContent && isObj(data.content)) {
    if (Object.keys(data.content).length !== 1) {
      errors.push('content must have exactly one entry')
    }
  }

  // example vs examples – mutually exclusive
  if ('example' in data && 'examples' in data) {
    errors.push('example and examples are mutually exclusive')
  }

  // Style validation
  if ('style' in data) {
    if (!isStr(data.style)) {
      errors.push('style must be a string')
    } else if (!ALL_STYLES.has(data.style)) {
      errors.push(`Invalid style: ${data.style}`)
    } else if (isStr(data.in) && STYLE_MAP[data.in]) {
      if (!STYLE_MAP[data.in].has(data.style)) {
        errors.push(`Style ${data.style} not valid for ${data.in} parameters`)
      }
    }
  }

  errors.push(...unknownFieldErrors(data, PARAMETER_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.13 – Request Body Object
// ---------------------------------------------------------------------------

const REQUEST_BODY_FIELDS = new Set(['content', 'description', 'required'])

export function validateRequestBodyObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('content' in data)) errors.push('Missing required field: content')
  else if (!isObj(data.content)) errors.push('content must be an object')

  if ('required' in data && !isBool(data.required)) errors.push('required must be a boolean')

  errors.push(...unknownFieldErrors(data, REQUEST_BODY_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.14 – Media Type Object
// ---------------------------------------------------------------------------

const MEDIA_TYPE_FIELDS = new Set(['schema', 'example', 'examples', 'encoding'])

export function validateMediaTypeObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('example' in data && 'examples' in data) {
    errors.push('example and examples are mutually exclusive')
  }

  errors.push(...unknownFieldErrors(data, MEDIA_TYPE_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.15 – Encoding Object
// ---------------------------------------------------------------------------

const ENCODING_FIELDS = new Set(['contentType', 'headers', 'style', 'explode', 'allowReserved'])

export function validateEncodingObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('style' in data && !isStr(data.style)) errors.push('style must be a string')
  if ('explode' in data && !isBool(data.explode)) errors.push('explode must be a boolean')
  if ('allowReserved' in data && !isBool(data.allowReserved)) errors.push('allowReserved must be a boolean')

  errors.push(...unknownFieldErrors(data, ENCODING_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.16 – Responses Object
// ---------------------------------------------------------------------------

const STATUS_CODE_RE = /^\d{3}$/
const WILDCARD_RE = /^[1-5]XX$/

export function validateResponsesObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  let hasResponse = false
  for (const key of Object.keys(data)) {
    if (key.startsWith('x-')) continue
    if (key === 'default' || STATUS_CODE_RE.test(key) || WILDCARD_RE.test(key)) {
      hasResponse = true
    } else {
      errors.push(`Invalid response key: ${key}`)
    }
  }

  if (!hasResponse) errors.push('Must have at least one response')
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.17 – Response Object
// ---------------------------------------------------------------------------

const RESPONSE_FIELDS = new Set(['description', 'headers', 'content', 'links'])

export function validateResponseObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('description' in data)) errors.push('Missing required field: description')
  else if (!isStr(data.description)) errors.push('description must be a string')

  errors.push(...unknownFieldErrors(data, RESPONSE_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.18 – Callback Object
// ---------------------------------------------------------------------------

export function validateCallbackObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  return ok()
}

// ---------------------------------------------------------------------------
// 4.8.19 – Example Object
// ---------------------------------------------------------------------------

const EXAMPLE_FIELDS = new Set(['summary', 'description', 'value', 'externalValue'])

export function validateExampleObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('externalValue' in data && !isUriRef(data.externalValue)) {
    errors.push('externalValue must be a URI')
  }

  if ('value' in data && 'externalValue' in data) {
    errors.push('value and externalValue are mutually exclusive')
  }

  errors.push(...unknownFieldErrors(data, EXAMPLE_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.20 – Link Object
// ---------------------------------------------------------------------------

const LINK_FIELDS = new Set([
  'operationRef', 'operationId', 'parameters', 'requestBody', 'description', 'server',
])

export function validateLinkObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('operationRef' in data && 'operationId' in data) {
    errors.push('operationRef and operationId are mutually exclusive')
  }

  if ('server' in data && !isObj(data.server)) {
    errors.push('server must be an object')
  }

  errors.push(...unknownFieldErrors(data, LINK_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.21 – Header Object
// ---------------------------------------------------------------------------

const HEADER_FIELDS = new Set([
  'description', 'required', 'deprecated', 'style', 'explode',
  'schema', 'content', 'example', 'examples',
])

export function validateHeaderObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  // Forbidden fields (inherited from Parameter but not allowed on Header)
  if ('name' in data) errors.push('name is not allowed on Header Object')
  if ('in' in data) errors.push('in is not allowed on Header Object')
  if ('allowEmptyValue' in data) errors.push('allowEmptyValue is not allowed on Header Object')
  if ('allowReserved' in data) errors.push('allowReserved is not allowed on Header Object')

  // style must be "simple" if present
  if ('style' in data && data.style !== 'simple') {
    errors.push('style must be "simple" for headers')
  }

  // schema vs content – mutually exclusive (but both optional for Header)
  if ('schema' in data && 'content' in data) {
    errors.push('schema and content are mutually exclusive')
  }

  if ('content' in data && isObj(data.content)) {
    if (Object.keys(data.content).length !== 1) {
      errors.push('content must have exactly one entry')
    }
  }

  // example vs examples – mutually exclusive
  if ('example' in data && 'examples' in data) {
    errors.push('example and examples are mutually exclusive')
  }

  errors.push(...unknownFieldErrors(data, HEADER_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.22 – Tag Object
// ---------------------------------------------------------------------------

const TAG_FIELDS = new Set(['name', 'description', 'externalDocs'])

export function validateTagObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('name' in data)) errors.push('Missing required field: name')
  else if (!isStr(data.name)) errors.push('name must be a string')

  if ('externalDocs' in data && !isObj(data.externalDocs)) {
    errors.push('externalDocs must be an object')
  }

  errors.push(...unknownFieldErrors(data, TAG_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.23 – Reference Object
// ---------------------------------------------------------------------------

const REFERENCE_FIELDS = new Set(['$ref', 'summary', 'description'])

export function validateReferenceObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('$ref' in data)) errors.push('Missing required field: $ref')
  else if (!isStr(data.$ref)) errors.push('$ref must be a string')

  // Reference Objects do NOT allow specification extensions or unknown fields
  for (const key of Object.keys(data)) {
    if (!REFERENCE_FIELDS.has(key)) {
      errors.push(`Unknown field not allowed on Reference Object: ${key}`)
    }
  }

  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.24 – Schema Object
// ---------------------------------------------------------------------------

export function validateSchemaObject(data: unknown): ValidationResult {
  // Schema can be a boolean (true = accept any, false = accept none)
  if (isBool(data)) return ok()
  if (!isObj(data)) return fail('Must be an object or boolean')
  // Schema Object follows JSON Schema Draft 2020-12 — nearly any property is valid
  return ok()
}

// ---------------------------------------------------------------------------
// 4.8.25 – Discriminator Object
// ---------------------------------------------------------------------------

const DISCRIMINATOR_FIELDS = new Set(['propertyName', 'mapping'])

export function validateDiscriminatorObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('propertyName' in data)) errors.push('Missing required field: propertyName')
  else if (!isStr(data.propertyName)) errors.push('propertyName must be a string')

  if ('mapping' in data) {
    if (!isObj(data.mapping)) {
      errors.push('mapping must be an object')
    } else {
      for (const [key, value] of Object.entries(data.mapping)) {
        if (!isStr(value)) errors.push(`mapping value for ${key} must be a string`)
      }
    }
  }

  errors.push(...unknownFieldErrors(data, DISCRIMINATOR_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.26 – XML Object
// ---------------------------------------------------------------------------

const XML_FIELDS = new Set(['name', 'namespace', 'prefix', 'attribute', 'wrapped'])

export function validateXmlObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if ('name' in data && !isStr(data.name)) errors.push('name must be a string')
  if ('prefix' in data && !isStr(data.prefix)) errors.push('prefix must be a string')
  if ('attribute' in data && !isBool(data.attribute)) errors.push('attribute must be a boolean')
  if ('wrapped' in data && !isBool(data.wrapped)) errors.push('wrapped must be a boolean')

  if ('namespace' in data && !isAbsoluteUri(data.namespace)) {
    errors.push('namespace must be a non-relative URI')
  }

  errors.push(...unknownFieldErrors(data, XML_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.27 – Security Scheme Object
// ---------------------------------------------------------------------------

const SECURITY_SCHEME_FIELDS = new Set([
  'type', 'description', 'name', 'in', 'scheme', 'bearerFormat', 'flows', 'openIdConnectUrl',
])
const SECURITY_SCHEME_TYPES = new Set(['apiKey', 'http', 'oauth2', 'openIdConnect', 'mutualTLS'])
const API_KEY_IN_VALUES = new Set(['query', 'header', 'cookie'])

export function validateSecuritySchemeObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  if (!('type' in data)) return fail('Missing required field: type')
  if (!isStr(data.type)) return fail('type must be a string')
  if (!SECURITY_SCHEME_TYPES.has(data.type)) return fail(`Invalid type: ${data.type}`)

  switch (data.type) {
    case 'apiKey':
      if (!('name' in data) || !isStr(data.name)) errors.push('apiKey requires name')
      if (!('in' in data)) errors.push('apiKey requires in')
      else if (!isStr(data.in) || !API_KEY_IN_VALUES.has(data.in)) {
        errors.push('apiKey in must be query, header, or cookie')
      }
      break
    case 'http':
      if (!('scheme' in data) || !isStr(data.scheme)) errors.push('http requires scheme')
      break
    case 'oauth2':
      if (!('flows' in data) || !isObj(data.flows)) errors.push('oauth2 requires flows')
      break
    case 'openIdConnect':
      if (!('openIdConnectUrl' in data) || !isStr(data.openIdConnectUrl)) {
        errors.push('openIdConnect requires openIdConnectUrl')
      }
      break
    case 'mutualTLS':
      break
  }

  errors.push(...unknownFieldErrors(data, SECURITY_SCHEME_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.28 – OAuth Flows Object
// ---------------------------------------------------------------------------

const OAUTH_FLOWS_FIELDS = new Set(['implicit', 'password', 'clientCredentials', 'authorizationCode'])

export function validateOAuthFlowsObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  for (const field of OAUTH_FLOWS_FIELDS) {
    if (field in data && !isObj(data[field])) {
      errors.push(`${field} must be an object`)
    }
  }

  errors.push(...unknownFieldErrors(data, OAUTH_FLOWS_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.29 – OAuth Flow Object
// ---------------------------------------------------------------------------

const OAUTH_FLOW_FIELDS = new Set(['authorizationUrl', 'tokenUrl', 'refreshUrl', 'scopes'])

export function validateOAuthFlowObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  // scopes is always required
  if (!('scopes' in data)) {
    errors.push('Missing required field: scopes')
  } else if (!isObj(data.scopes)) {
    errors.push('scopes must be an object')
  } else {
    for (const [key, value] of Object.entries(data.scopes as Record<string, unknown>)) {
      if (!isStr(value)) errors.push(`scope value for ${key} must be a string`)
    }
  }

  // At least one of authorizationUrl or tokenUrl must be present
  if (!('authorizationUrl' in data) && !('tokenUrl' in data)) {
    errors.push('Must have at least one of authorizationUrl or tokenUrl')
  }

  if ('authorizationUrl' in data && !isUriRef(data.authorizationUrl)) {
    errors.push('authorizationUrl must be a URI')
  }
  if ('tokenUrl' in data && !isUriRef(data.tokenUrl)) {
    errors.push('tokenUrl must be a URI')
  }
  if ('refreshUrl' in data && !isUriRef(data.refreshUrl)) {
    errors.push('refreshUrl must be a URI')
  }

  errors.push(...unknownFieldErrors(data, OAUTH_FLOW_FIELDS))
  return errors.length ? fail(...errors) : ok()
}

// ---------------------------------------------------------------------------
// 4.8.30 – Security Requirement Object
// ---------------------------------------------------------------------------

export function validateSecurityRequirementObject(data: unknown): ValidationResult {
  if (!isObj(data)) return fail('Must be an object')
  const errors: string[] = []

  for (const [key, value] of Object.entries(data)) {
    if (!isArr(value)) {
      errors.push(`Value for ${key} must be an array`)
    } else {
      for (const item of value) {
        if (!isStr(item)) errors.push(`Array values for ${key} must be strings`)
      }
    }
  }

  return errors.length ? fail(...errors) : ok()
}

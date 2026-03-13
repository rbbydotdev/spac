import ts from 'typescript'

// ---------------------------------------------------------------------------
// Known spac method categories
// ---------------------------------------------------------------------------

const HTTP_METHODS = new Set([
  'get', 'post', 'put', 'patch', 'delete', 'options', 'head', 'trace',
])

/** Chain methods on RouteBuilder that take a string first arg */
const ROUTE_CHAIN_KEYED: Record<string, string> = {
  summary: 'summary',
  description: 'description',
  tag: 'tags',
  tags: 'tags',
  operationId: 'operationId',
}

/** Chain methods with special key patterns */
const ROUTE_CHAIN_SPECIAL = new Set([
  'deprecated', 'security', 'error', 'server', 'extension',
])

/** Api-level config methods that use staged sources */
const API_STAGED: Record<string, string> = {
  server: '__server',
  tag: '__tag',
  security: '__security',
}

/** Api-level config methods that use direct key: securityScheme → securityScheme:<name>, schema → schema:<name> */
const API_KEYED_BY_ARG = new Set(['securityScheme', 'schema'])

// ---------------------------------------------------------------------------
// Taint checking — determines if an expression chains from a spac import
// ---------------------------------------------------------------------------

function isSpacExpression(
  node: ts.Expression,
  tainted: Set<string>,
): boolean {
  if (ts.isIdentifier(node)) {
    return tainted.has(node.text)
  }
  if (ts.isPropertyAccessExpression(node)) {
    return isSpacExpression(node.expression, tainted)
  }
  if (ts.isCallExpression(node)) {
    if (ts.isPropertyAccessExpression(node.expression)) {
      return isSpacExpression(node.expression.expression, tainted)
    }
    // new Api() returned and immediately chained: new Api('x').server(...)
    if (ts.isNewExpression(node.expression)) {
      return isSpacExpression(node.expression, tainted)
    }
    return isSpacExpression(node.expression, tainted)
  }
  if (ts.isNewExpression(node)) {
    if (ts.isIdentifier(node.expression)) return tainted.has(node.expression.text)
  }
  if (ts.isParenthesizedExpression(node)) {
    return isSpacExpression(node.expression, tainted)
  }
  return false
}

// ---------------------------------------------------------------------------
// Source location helpers
// ---------------------------------------------------------------------------

function getLineCol(sourceFile: ts.SourceFile, pos: number): [number, number] {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(pos)
  return [line + 1, character + 1]
}

function createSrcLocArray(
  factory: ts.NodeFactory,
  fileName: string,
  line: number,
  col: number,
): ts.ArrayLiteralExpression {
  return factory.createArrayLiteralExpression([
    factory.createStringLiteral(fileName),
    factory.createNumericLiteral(line),
    factory.createNumericLiteral(col),
  ])
}

// ---------------------------------------------------------------------------
// AST injection helpers
// ---------------------------------------------------------------------------

/**
 * Wrap `receiver.method(args)` → `receiver._src(key, [file, line, col]).method(args)`
 */
function wrapWithSrc(
  factory: ts.NodeFactory,
  callExpr: ts.CallExpression,
  key: string,
  fileName: string,
  line: number,
  col: number,
): ts.CallExpression {
  const propAccess = callExpr.expression as ts.PropertyAccessExpression
  const receiver = propAccess.expression
  const methodName = propAccess.name

  // Create: receiver._src(key, [file, line, col])
  const srcCall = factory.createCallExpression(
    factory.createPropertyAccessExpression(receiver, '_src'),
    undefined,
    [
      factory.createStringLiteral(key),
      createSrcLocArray(factory, fileName, line, col),
    ],
  )

  // Create: srcCall.method(args)
  return factory.createCallExpression(
    factory.createPropertyAccessExpression(srcCall, methodName),
    callExpr.typeArguments,
    callExpr.arguments,
  )
}

/**
 * Add __src metadata property to a config object literal.
 */
function addSrcToConfig(
  factory: ts.NodeFactory,
  configObj: ts.ObjectLiteralExpression,
  sourceFile: ts.SourceFile,
  callLine: number,
  callCol: number,
): ts.ObjectLiteralExpression {
  const fileName = sourceFile.fileName
  const srcProps: ts.PropertyAssignment[] = []

  // __file
  srcProps.push(factory.createPropertyAssignment(
    '__file',
    factory.createStringLiteral(fileName),
  ))

  // __call — position of the HTTP method call
  srcProps.push(factory.createPropertyAssignment(
    '__call',
    factory.createArrayLiteralExpression([
      factory.createNumericLiteral(callLine),
      factory.createNumericLiteral(callCol),
    ]),
  ))

  // Each property of the config object
  for (const prop of configObj.properties) {
    if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
      const propName = prop.name.text
      if (propName === '__src') continue
      const [pLine, pCol] = getLineCol(sourceFile, prop.getStart(sourceFile))
      srcProps.push(factory.createPropertyAssignment(
        propName,
        factory.createArrayLiteralExpression([
          factory.createNumericLiteral(pLine),
          factory.createNumericLiteral(pCol),
        ]),
      ))
    }
    if (ts.isShorthandPropertyAssignment(prop)) {
      const propName = prop.name.text
      const [pLine, pCol] = getLineCol(sourceFile, prop.getStart(sourceFile))
      srcProps.push(factory.createPropertyAssignment(
        propName,
        factory.createArrayLiteralExpression([
          factory.createNumericLiteral(pLine),
          factory.createNumericLiteral(pCol),
        ]),
      ))
    }
  }

  // Descend into `responses` to track per-status and per-sub-property positions
  for (const prop of configObj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = ts.isIdentifier(prop.name) ? prop.name.text : null
    if (name !== 'responses' || !ts.isObjectLiteralExpression(prop.initializer)) continue

    for (const statusProp of prop.initializer.properties) {
      if (!ts.isPropertyAssignment(statusProp)) continue
      const statusKey = ts.isIdentifier(statusProp.name) ? statusProp.name.text
        : ts.isNumericLiteral(statusProp.name) ? statusProp.name.text
        : ts.isStringLiteral(statusProp.name) ? statusProp.name.text
        : null
      if (!statusKey) continue

      // Record the status code entry position
      const [sLine, sCol] = getLineCol(sourceFile, statusProp.getStart(sourceFile))
      srcProps.push(factory.createPropertyAssignment(
        factory.createStringLiteral(`responses:${statusKey}`),
        factory.createArrayLiteralExpression([
          factory.createNumericLiteral(sLine),
          factory.createNumericLiteral(sCol),
        ]),
      ))

      // If the status value is an object literal (ResponseDef), track its sub-properties
      if (ts.isObjectLiteralExpression(statusProp.initializer)) {
        for (const subProp of statusProp.initializer.properties) {
          if (!ts.isPropertyAssignment(subProp) || !ts.isIdentifier(subProp.name)) continue
          const subName = subProp.name.text
          const [spLine, spCol] = getLineCol(sourceFile, subProp.getStart(sourceFile))
          srcProps.push(factory.createPropertyAssignment(
            factory.createStringLiteral(`responses:${statusKey}:${subName}`),
            factory.createArrayLiteralExpression([
              factory.createNumericLiteral(spLine),
              factory.createNumericLiteral(spCol),
            ]),
          ))
        }
      }
    }
  }

  const srcObj = factory.createObjectLiteralExpression(srcProps, true)
  const srcProp = factory.createPropertyAssignment('__src', srcObj)

  return factory.createObjectLiteralExpression(
    [...configObj.properties, srcProp],
    configObj.properties.hasTrailingComma,
  )
}

// ---------------------------------------------------------------------------
// Transformer factory
// ---------------------------------------------------------------------------

export function createSpacTransformerFactory(): ts.TransformerFactory<ts.SourceFile> {
  return (context: ts.TransformationContext) => {
    const factory = context.factory

    return (sourceFile: ts.SourceFile) => {
      const fileName = sourceFile.fileName
      const tainted = new Set<string>()
      /** Identifiers known to be Api class instances (not RouteBuilder/GroupBuilder) */
      const apiInstances = new Set<string>()

      // ---------------------------------------------------------------
      // Pass 1: Find spac imports and seed the tainted set
      // ---------------------------------------------------------------
      for (const stmt of sourceFile.statements) {
        if (!ts.isImportDeclaration(stmt)) continue
        const spec = stmt.moduleSpecifier
        if (!ts.isStringLiteral(spec)) continue
        if (spec.text !== 'spac' && !spec.text.startsWith('spac/')) continue

        const clause = stmt.importClause
        if (!clause) continue

        // Default import: import Api from 'spac'
        if (clause.name) tainted.add(clause.name.text)

        // Named imports: import { Api, RouteBuilder } from 'spac'
        if (clause.namedBindings && ts.isNamedImports(clause.namedBindings)) {
          for (const el of clause.namedBindings.elements) {
            const name = el.name.text
            if (name === 'Api' || name === 'GroupBuilder' || name === 'RouteBuilder') {
              tainted.add(el.propertyName?.text ?? name)
              tainted.add(name)
            }
          }
        }
      }

      if (tainted.size === 0) return sourceFile

      // ---------------------------------------------------------------
      // Helpers to detect new Api(...) expressions
      // ---------------------------------------------------------------
      function isNewApiExpr(node: ts.Expression): boolean {
        // (new Api(...))._src(...)
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
          if (node.expression.name.text === '_src') {
            return isNewApiExpr(node.expression.expression)
          }
        }
        if (ts.isParenthesizedExpression(node)) return isNewApiExpr(node.expression)
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
          return tainted.has(node.expression.text)
        }
        return false
      }

      // ---------------------------------------------------------------
      // Helpers to distinguish Api vs RouteBuilder receivers
      // ---------------------------------------------------------------
      function isApiReceiver(node: ts.Expression): boolean {
        // Direct identifier known to be Api instance
        if (ts.isIdentifier(node) && apiInstances.has(node.text)) return true
        // new Api(...)
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && tainted.has(node.expression.text)) return true
        // Parenthesized
        if (ts.isParenthesizedExpression(node)) return isApiReceiver(node.expression)
        // Chained Api config: api._src(...).server(...)._src(...) → still Api
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
          const name = node.expression.name.text
          // _src always returns this, so check the receiver
          if (name === '_src') return isApiReceiver(node.expression.expression)
          // Api methods that return `this` (not RouteBuilder)
          if (['server', 'securityScheme', 'tag', 'schema', 'security', 'use', 'group'].includes(name)) {
            return isApiReceiver(node.expression.expression)
          }
        }
        return false
      }

      // ---------------------------------------------------------------
      // Pass 2: Walk AST, taint variables, and transform calls
      // ---------------------------------------------------------------
      function visitor(node: ts.Node): ts.Node {
        // Track variable assignments: const api = new Api(...)
        if (ts.isVariableDeclaration(node) && node.initializer && ts.isIdentifier(node.name)) {
          const init = ts.visitNode(node.initializer, visitor) as ts.Expression
          if (isSpacExpression(init, tainted)) {
            tainted.add(node.name.text)
            // Check if it's specifically an Api instance
            if (isNewApiExpr(init)) {
              apiInstances.add(node.name.text)
            }
          }
          return factory.updateVariableDeclaration(
            node,
            node.name,
            node.exclamationToken,
            node.type,
            init,
          )
        }

        // Track tainted identifiers from callback params in .group()
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
          const methodName = node.expression.name.text
          if (methodName === 'group' && isSpacExpression(node.expression.expression, tainted)) {
            // Find the callback argument and taint its parameter
            for (const arg of node.arguments) {
              if (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) {
                if (arg.parameters.length > 0 && ts.isIdentifier(arg.parameters[0].name)) {
                  tainted.add(arg.parameters[0].name.text)
                }
              }
            }
          }
        }

        // Transform call expressions on spac objects
        if (ts.isCallExpression(node) && ts.isPropertyAccessExpression(node.expression)) {
          const propAccess = node.expression
          const methodName = propAccess.name.text
          const receiver = propAccess.expression

          if (isSpacExpression(receiver, tainted)) {
            // Visit children first so nested calls are transformed
            const visited = ts.visitEachChild(node, visitor, context) as ts.CallExpression

            const [line, col] = getLineCol(sourceFile, node.getStart(sourceFile))

            const isApi = isApiReceiver(receiver)

            // --- HTTP method: inject __src into config object ---
            if (HTTP_METHODS.has(methodName) && visited.arguments.length >= 2) {
              const configArg = visited.arguments[1]
              if (ts.isObjectLiteralExpression(configArg)) {
                const newConfig = addSrcToConfig(factory, configArg, sourceFile, line, col)
                const newArgs = [visited.arguments[0], newConfig, ...visited.arguments.slice(2)]
                return factory.createCallExpression(
                  visited.expression,
                  visited.typeArguments,
                  newArgs,
                )
              }
            }

            // --- Api-level methods (checked before RouteBuilder since names overlap) ---
            if (isApi) {
              // Api staged methods: server, tag, security
              if (methodName in API_STAGED) {
                const stageKey = API_STAGED[methodName]
                return wrapWithSrc(factory, visited, stageKey, fileName, line, col)
              }
              // Api keyed-by-arg: securityScheme, schema
              if (API_KEYED_BY_ARG.has(methodName) && visited.arguments.length >= 1) {
                const nameArg = visited.arguments[0]
                if (ts.isStringLiteral(nameArg)) {
                  const key = `${methodName}:${nameArg.text}`
                  return wrapWithSrc(factory, visited, key, fileName, line, col)
                }
              }
            }

            // --- RouteBuilder chain methods with known keys ---
            if (methodName in ROUTE_CHAIN_KEYED) {
              const key = ROUTE_CHAIN_KEYED[methodName]
              return wrapWithSrc(factory, visited, key, fileName, line, col)
            }

            // --- RouteBuilder special chain methods ---
            if (ROUTE_CHAIN_SPECIAL.has(methodName)) {
              let key: string
              if (methodName === 'deprecated') {
                key = 'deprecated'
              } else if (methodName === 'error' && visited.arguments.length >= 1) {
                const statusArg = visited.arguments[0]
                if (ts.isNumericLiteral(statusArg)) {
                  key = `error:${statusArg.text}`
                } else {
                  key = 'error'
                }
              } else if (methodName === 'extension' && visited.arguments.length >= 1) {
                const nameArg = visited.arguments[0]
                if (ts.isStringLiteral(nameArg)) {
                  const extKey = nameArg.text.startsWith('x-') ? nameArg.text : `x-${nameArg.text}`
                  key = `ext:${extKey}`
                } else {
                  key = 'extension'
                }
              } else if (methodName === 'security') {
                key = 'security'
              } else if (methodName === 'server') {
                key = 'servers'
              } else {
                key = methodName
              }
              return wrapWithSrc(factory, visited, key, fileName, line, col)
            }

            // --- new Api()._src('info', loc) handled below ---
            return visited
          }
        }

        // Transform `new Api(...)` → `new Api(...)._src('info', [file, line, col])`
        if (ts.isNewExpression(node) && ts.isIdentifier(node.expression) && tainted.has(node.expression.text)) {
          const visited = ts.visitEachChild(node, visitor, context) as ts.NewExpression
          const [line, col] = getLineCol(sourceFile, node.getStart(sourceFile))

          return factory.createCallExpression(
            factory.createPropertyAccessExpression(
              factory.createParenthesizedExpression(visited),
              '_src',
            ),
            undefined,
            [
              factory.createStringLiteral('info'),
              createSrcLocArray(factory, fileName, line, col),
            ],
          )
        }

        return ts.visitEachChild(node, visitor, context)
      }

      return ts.visitNode(sourceFile, visitor) as ts.SourceFile
    }
  }
}

// ---------------------------------------------------------------------------
// Convenience: transform source code string
// ---------------------------------------------------------------------------

/**
 * Transform spac TypeScript source code, injecting compile-time source
 * location metadata for fine-grained source maps.
 *
 * @param code - The TypeScript source code
 * @param fileName - The file path (used in source locations)
 * @returns The transformed source code
 */
export function transform(code: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.ESNext,
    /* setParentNodes */ true,
    ts.ScriptKind.TS,
  )

  const result = ts.transform(sourceFile, [createSpacTransformerFactory()])
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  const output = printer.printFile(result.transformed[0])
  result.dispose()

  return output
}

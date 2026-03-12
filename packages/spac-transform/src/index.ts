import ts from 'typescript'
import { createSpacTransformerFactory } from './transformer.js'

export { createSpacTransformerFactory } from './transformer.js'
export { vlqEncode, encodeSegments } from './vlq.js'
export { generateSourceMap } from './sourcemap.js'
export type { Mapping, V3SourceMap } from './sourcemap.js'
export { serializeWithPositions } from './serialize.js'
export type { SerializeResult } from './serialize.js'

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

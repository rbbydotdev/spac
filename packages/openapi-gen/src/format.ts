import { Biome, Distribution } from '@biomejs/js-api'

export async function formatTS(): Promise<(source: string) => string> {
  const biome = await Biome.create({ distribution: Distribution.NODE })
  biome.applyConfiguration({
    files: { maxSize: 5 * 1024 * 1024 },
    formatter: { indentStyle: 'space', indentWidth: 2, lineWidth: 120 },
    javascript: { formatter: { quoteStyle: 'double', semicolons: 'asNeeded' } },
  })
  return (source: string) => {
    const { content } = biome.formatContent(source, { filePath: 'file.ts' })
    return content
  }
}

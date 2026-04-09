import type { SpacPlugin } from '@spec-spac/from-openapi'

export interface BiomePluginOptions {
  indentStyle?: 'space' | 'tab'
  indentWidth?: number
  lineWidth?: number
  quoteStyle?: 'double' | 'single'
  semicolons?: 'always' | 'asNeeded'
}

export function biomePlugin(options: BiomePluginOptions = {}): SpacPlugin {
  let format: ((source: string) => string) | null = null

  return {
    name: 'biome',
    async formatFile(_filePath, content) {
      if (!format) {
        const { Biome, Distribution } = await import('@biomejs/js-api')
        const biome = await Biome.create({ distribution: Distribution.NODE })
        biome.applyConfiguration({
          files: { maxSize: 5 * 1024 * 1024 },
          formatter: {
            indentStyle: options.indentStyle ?? 'space',
            indentWidth: options.indentWidth ?? 2,
            lineWidth: options.lineWidth ?? 120,
          },
          javascript: {
            formatter: {
              quoteStyle: options.quoteStyle ?? 'double',
              semicolons: options.semicolons ?? 'asNeeded',
            },
          },
        })
        format = (source: string) => {
          const { content } = biome.formatContent(source, { filePath: 'file.ts' })
          return content
        }
      }
      return format(content)
    },
  }
}

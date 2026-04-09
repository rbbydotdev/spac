import type { SpacPlugin } from '@spec-spac/from-openapi'

export interface PrettierPluginOptions {
  printWidth?: number
  tabWidth?: number
  useTabs?: boolean
  semi?: boolean
  singleQuote?: boolean
  trailingComma?: 'all' | 'es5' | 'none'
  /** Path to a prettier config file. Overrides inline options when set. */
  configPath?: string
}

export function prettierPlugin(options: PrettierPluginOptions = {}): SpacPlugin {
  let prettier: typeof import('prettier') | null = null

  return {
    name: 'prettier',
    async formatFile(_filePath, content) {
      if (!prettier) {
        prettier = await import('prettier')
      }

      const config = options.configPath
        ? await prettier.resolveConfig(options.configPath)
        : null

      return prettier.format(content, {
        parser: 'typescript',
        ...(config ?? {
          printWidth: options.printWidth ?? 120,
          tabWidth: options.tabWidth ?? 2,
          useTabs: options.useTabs ?? false,
          semi: options.semi ?? true,
          singleQuote: options.singleQuote ?? false,
          trailingComma: options.trailingComma ?? 'all',
        }),
      })
    },
  }
}

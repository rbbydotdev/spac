import * as esbuild from 'esbuild'

const watch = process.argv.includes('--watch')

/** @type {esbuild.BuildOptions} */
const config = {
  entryPoints: ['src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  minify: false,
}

if (watch) {
  const ctx = await esbuild.context(config)
  await ctx.watch()
  console.log('Watching for changes...')
} else {
  await esbuild.build(config)
  console.log('Build complete.')

  // Also bundle the compiler worker separately
  await esbuild.build({
    entryPoints: ['src/compiler-worker.ts'],
    bundle: true,
    outfile: 'dist/compiler-worker.js',
    external: ['vscode'],
    format: 'esm',
    platform: 'node',
    target: 'node18',
    sourcemap: true,
    minify: false,
    banner: {
      js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
    },
  })
  console.log('Worker build complete.')
}

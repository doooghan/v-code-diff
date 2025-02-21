import * as path from 'path'
import { defineConfig } from 'vite'
import { isVue2 } from 'vue-demi'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

const outputName = 'index'
export const defaultPlugins = [
  cssInjectedByJsPlugin(),
]

// https://vitejs.dev/config/
export const baseBuildConfig = defineConfig({
  build: {
    outDir: path.resolve(__dirname, `./dist/${isVue2 ? 'v2' : 'v3'}`),
    emptyOutDir: false,
    target: 'es2018',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'index',
      fileName: format => `${outputName}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@vue/composition-api/dist/vue-composition-api.mjs'],
      output: {
        globals: {
          'vue': 'Vue',
          '@vue/composition-api/dist/vue-composition-api.mjs':
            'VueCompositionAPI',
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi', 'vue', 'vue2'],
  },
})

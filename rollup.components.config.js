
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { string } from 'rollup-plugin-string'
import glob from 'glob'
import json from 'rollup-plugin-json'
import clear from 'rollup-plugin-clear'
const input = glob.sync('components/**/*.{component,hook}.js')

export default {
  input,
  output: [{
    dir: 'js/components',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].[hash].js'
  }],
  plugins: [
    clear({targets: ['js/components']}),
    resolve({
      preferBuiltins: false,
      browser: true
    }),
    json(),
    commonjs(),
    string({
      // Required to be specified
      include: '**/*.{txt,css}' }),
    terser()
  ]
}

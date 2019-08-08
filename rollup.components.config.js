
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { string } from 'rollup-plugin-string'
import glob from 'glob'
import json from 'rollup-plugin-json'
import clear from 'rollup-plugin-clear'
import svelte from 'rollup-plugin-svelte'
const input = glob.sync('components/**/*.{component,hook}.{js,svelte}')
console.log(input)
const production = process.env.NODE_ENV === 'production'

export default {
  input,
  output: [{
    dir: 'js/components',
    format: 'es',
    sourcemap: true,
    entryFileNames: production ? '[name].[hash].js' : '[name].dev.js'
  }],
  plugins: [
    clear({targets: ['js/components']}),
    resolve({
      preferBuiltins: false,
      browser: true
    }),
    json(),
    commonjs(),
    svelte({
      emitCss: true,
      dev: !production,
      css: function (css) {
        console.log(css.code) // the concatenated CSS
        console.log(css.map) // a sourcemap

        // creates `main.css` and `main.css.map` — pass `false`
        // as the second argument if you don't want the sourcemap
        css.write('static/styles/svelte.css')
      }
    }),
    string({
      // Required to be specified
      include: '**/*.{txt,css}' }),
    production && terser()
  ]
}

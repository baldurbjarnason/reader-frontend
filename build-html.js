const glob = require('glob')
const fs = require('fs')
const crypto = require('crypto')

const production = process.env.NODE_ENV === 'production'

const build = module.exports = function build () {
  const components = glob.sync('*.component.*.{js,svelte}', {cwd: 'js/components/'})

  const componentsContents = `
  ${components.map(name => `import './components/${name}'`).join('\n')}
  `

  const hash = crypto
    .createHash('md5')
    .update(componentsContents)
    .digest('hex')
    .substr(0, 16)

  const filename = production ? `js/index.${hash}.js` : `js/index.dev.js`
  fs.writeFileSync(filename, componentsContents)

  const css = production ? glob.sync('static/styles/app.*.css')[0] : 'static/styles/app.dev.css'

  fs.writeFileSync('html/index.html', `
  <!DOCTYPE html>
  <html class="no-js">
  <head>
  <link media="all" rel="stylesheet" href="/${css}">
  <title>Rebus Ink</title>
  <script src="/js/vendor/document-register-element.js" nomodule></script>
  <script>
    try {
      import('/${filename}')
    } catch (e) {
      var s = document.createElement('script')
      s.src = '/js/shimport.js'
      s.dataset.main = '/${filename}'
      document.head.appendChild(s)
    }
    document.documentElement.classList.remove('no-js')
  </script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" 
        type="image/png" 
        href="/static/rebus-ink-square-512.png">
        <link rel="apple-touch-icon" sizes="512x512" href="/static/rebus-ink-square-512.png">
  </head>
    <body>
      <div><ink-app></ink-app></div>
    </body>
  </html>
  `)
}
build()

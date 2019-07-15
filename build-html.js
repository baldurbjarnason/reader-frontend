const glob = require('glob')
const fs = require('fs')
const crypto = require('crypto')

module.exports = function build () {
  const components = glob.sync('*.component.*.js', {cwd: 'js/components/'})

  const componentsContents = `
  ${components.map(name => `import './${name}'`).join('\n')}
  `

  const hash = crypto
    .createHash('md5')
    .update(componentsContents)
    .digest('hex')
    .substr(0, 8)

  fs.writeFileSync(`js/components/index.${hash}.js`, componentsContents)

  const css = glob.sync('static/styles/app.*.css')[0]

  fs.writeFileSync('html/index.html', `
  <!DOCTYPE html>
  <html class="no-js">
  <head>
  <link media="all" rel="stylesheet" href="/${css}">
  <title>Rebus Ink</title>
  <script src="/js/vendor/document-register-element.js" nomodule></script>
  <script>
    try {
      import('/js/components/index.${hash}.js')
    } catch (e) {
      var s = document.createElement('script')
      s.src = '/js/shimport.js'
      s.dataset.main = '/js/components/index.${hash}.js'
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

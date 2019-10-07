const https = require('https')
const fs = require('fs')
const yaml = require('js-yaml')

// Auth
const doc = yaml.safeLoad(fs.readFileSync('./app-development.yaml', 'utf8'))

process.env.SECRETORKEY = doc.env_variables.SECRETORKEY
process.env.ISSUER = doc.env_variables.ISSUER
process.env.AUDIENCE = doc.env_variables.AUDIENCE
process.env.AUTH0_DOMAIN = doc.env_variables.AUTH0_DOMAIN
process.env.AUTH0_CLIENT_ID = doc.env_variables.AUTH0_CLIENT_ID
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0


const express = require('express')
const compression = require('compression')
const debug = require('debug')('vonnegut:server')
const cors = require('cors')
if (!process.env.DOMAIN) {
  process.env.DOMAIN = process.env.BASE
}
const app = express()
app.enable('strict routing')
app.disable('x-powered-by')
app.set('trust proxy', true)
app.options('*', cors({origin: true, credentials: true}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
const tokenApp = require('hobb-api/server.js').app
app.use('/', require('./server/token-auth.js'), tokenApp)
app.use(function (req, res, next) {
  const path = req.path || ''
  if (req.protocol !== 'https') {
    res.redirect(process.env.BASE + path)
  } else {
    next()
  }
})
tokenApp.initialize(true).catch(err => {
  debug(err)
  throw err
})
app.use(function (req, res, next) {
  res.status(404)
  res.send('Not Found')
})

app.use(require('./server/error-handler.js').errorHandler)

const options = {
  key: fs.readFileSync('./dev/localhost.key'),
  cert: fs.readFileSync('./dev/localhost.cert'),
  requestCert: false,
  rejectUnauthorized: false
}

const port = 4430
const server = https.createServer(options, app)

server.listen(port, function () {
  console.log('Express server listening on port ' + server.address().port)
})

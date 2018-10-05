'use strict'
require = require('esm')(module) // eslint-disable-line
const express = require('express')
const app = express()
const compression = require('compression')
// const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
// const cookieSession = require('cookie-session')
const basicAuth = require('express-basic-auth')
// const passport = require('passport')
const helmet = require('helmet')
// const csrf = require('csurf')
const morgan = require('morgan')
const viperHTML = require('viperhtml')
const { pageBody } = require('./views/page-body.js')
const { pageHead } = require('./views/page-head.js')

// Public staging and dev servers are locked down with a simple basic auth password
if (
  process.env.DEPLOY_STAGE === 'staging' ||
  process.env.DEPLOY_STAGE === 'development'
) {
  app.use(
    basicAuth({
      challenge: true,
      users: { admin: 'plasticfantasticsecret' || process.env.DEV_PASSWORD }
    })
  )
}

// Security settings
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        imgSrc: ['*', 'data:', 'https:'],
        frameSrc: [
          'https://www.youtube.com',
          'https://www.youtube-nocookie.com'
        ],
        fontSrc: ["'self'"],
        formAction: ["'self'", 'https://rebus.auth0.com/'],
        frameAncestors: ["'none'"]
      }
    }
  })
)

// Basic Settings
app.enable('strict routing')
app.set('trust proxy', true)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(compression())
app.use('/static', express.static('static'))

// Only require https if we aren't in dev.
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'development') {
  app.use(function (req, res, next) {
    const path = req.path || ''
    if (req.protocol !== 'https') {
      res.redirect(process.env.DOMAIN + path)
    } else {
      next()
    }
  })
  // We only need to log errors/bans. Build in App Engine logs are enough for the rest.
  app.use(
    morgan('combined', {
      skip: function (req, res) {
        return res.statusCode < 400
      }
    })
  )
} else {
  // Full logs with colours when in dev.
  app.use(morgan('dev'))
}

const viewModel = require('./library-mock.json')

app.get('/', function (req, res, next) {
  return res.format({
    'text/html': function () {
      const render = viperHTML.wire
      res.send(pageHead(render, viewModel) + pageBody(render, viewModel))
    },
    'application/json': function () {
      return res.send({ running: true })
    }
  })
})

module.exports = {
  // Export app for reuse in other express apps/servers
  app,
  // The actual server start code
  start (port) {
    app.listen(port, () => console.log('Listening'))
  }
}

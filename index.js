// const { setup } = require('./server.js')
// const { authserver } = require('./server/auth/auth-server.js')

// const Datastore = require('@google-cloud/datastore')
// const namespace = 'rebus-reader'
// const datastore = new Datastore({
//   namespace
// })
// const { GKeyV } = require('./server/utils/gkeyv.js')
// const accountStore = new GKeyV({ datastore })
// const tokenStore = new GKeyV({ datastore })

// Auth
// const Auth0Strategy = require('passport-auth0')
// const strategy = new Auth0Strategy(
//   {
//     domain: 'rebus.auth0.com',
//     clientID: process.env.AUTH0_CLIENT_ID,
//     clientSecret: process.env.AUTH0_CLIENT_SECRET,
//     callbackURL: `${process.env.BASE}/callback`
//   },
//   (accessToken, refreshToken, extraParams, profile, done) => {
//     return done(null, profile)
//   }
// )

// const app = setup(
//   authserver({
//     strategy,
//     accountStore,
//     tokenStore
//   })
// )

// Public staging and dev servers are locked down with a simple basic auth password
// if (
//   process.env.DEPLOY_STAGE === 'staging' ||
//   process.env.DEPLOY_STAGE === 'development'
// ) {
//   app.use(
//     basicAuth({
//       challenge: true,
//       users: { admin: process.env.DEV_PASSWORD || 'plasticfantasticsecret' }
//     })
//   )
// }
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
const PORT = process.env.PORT || 8080
app.listen(PORT, () => console.log('Listening'))

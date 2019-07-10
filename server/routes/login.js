const passport = require('passport')
const express = require('express')
const router = express.Router()
const path = require('path')

// Login and logout routes
router.post(
  '/login',
  function (req, res, next) {
    if (req.query.returnTo) {
      req.session.returnTo = req.query.returnTo
    }
    next()
  },
  passport.authenticate('auth0', { failureRedirect: '/login' })
)
router.get('/login', function (req, res, next) {
  if (req.user) {
    res.redirect(req.session.returnTo || '/')
  }
  res.type('html')
  res.sendFile(path.join(__dirname, '../../html/index.html'))
})

module.exports = router

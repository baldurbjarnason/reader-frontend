function tokenAuth (req, res, next) {
  if (
    !req.headers['authorization'] &&
    req.user &&
    req.user.token &&
    req.method === 'GET'
  ) {
    req.headers['authorization'] = `Bearer ${req.user.token}`
  }
  const originalRedirect = res.redirect
  let prefix
  if (req.user && req.query.cover) {
    prefix = '/images/resize/240/0/'
  } else if (req.user) {
    prefix = /asset/
  } else {
    prefix = ''
  }
  res.redirect = function (url) {
    res.set('Cache-Control', 'max-age=31536000,immutable')
    originalRedirect.call(this, 301, `${prefix}${encodeURIComponent(url)}`)
  }
  next()
}

module.exports = tokenAuth

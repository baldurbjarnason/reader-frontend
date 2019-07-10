const path = require('path')

function ensureLogin (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.type('html')
    res.sendFile(path.join(__dirname, '../html/index.html'))
  }
}

module.exports.ensureLogin = ensureLogin

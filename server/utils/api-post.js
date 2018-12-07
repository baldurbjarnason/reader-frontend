// @flow
const got = require('got')
const URL = require('url').URL
const debug = require('debug')('vonnegut:utils:api-post')

/**
 * A simple wrapper around `got` that fetches the resource using the token for auth, if available.
 *
 * At some point this needs to use configurable Keyv cache stores.
 */
async function post (url /*: string */, body/*: any */, token /*: string */) {
  let headers
  if (token) {
    headers = {
      Authorization: 'Bearer ' + token
    }
  }
  const options = {
    headers,
    method: 'POST',
    body: JSON.stringify(body),
    timeout: 1000
  }
  try {
    const fullURL = new URL(url, process.env.DOMAIN).href
    const response = await got(fullURL, options)
    const location = response.headers['location']
    const result = await got(location, {
      headers,
      json: true,
      timeout: 1000
    })
    debug(result)
    return result.body
  } catch (error) {
    throw error
  }
}

module.exports.post = post

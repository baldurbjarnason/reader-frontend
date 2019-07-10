class HTTPError extends Error {
  constructor (type, message, response) {
    super(message)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HTTPError)
    }
    this.httpMethod = type
    this.status = response.status
    this.response = response
  }
}
export async function fetchWrap (...args) {
  const response = await window.fetch(...args)
  if (!response.ok) {
    throw new HTTPError('Activities Request', response.statusText, response)
  }
  return response
}

export async function get (url, context, global) {
  try {
    const response = await fetchWrap(url, {
      credentials: 'include',
      headers: new window.Headers({
        'content-type': 'application/ld+json'
      })
    })
    return response.json()
  } catch (err) {
    err.url = url
    throw err
  }
}

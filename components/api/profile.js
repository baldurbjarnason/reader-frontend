import { getToken } from './csrf.js'
import { fetchWrap, get } from './fetch.js'
import { endpoints } from '../endpoints.js'

export function createProfileAPI (context, api, global) {
  return {
    async outbox () {
      const profile = await getProfile(context, global)
      return endpoints.url(profile.outbox)
    },
    async upload () {
      const profile = await getProfile(context, global)
      return endpoints.url(profile.id, '/file-upload')
    },
    async notes () {
      const profile = await getProfile(context, global)
      return endpoints.url(profile.id, '/notes')
    },
    async library () {
      const profile = await getProfile(context, global)
      return endpoints.url(profile.id, '/library')
    },
    async update () {
      context.profile = await get(context.profile.id, context)
      return context.profile
    },
    whoami () {
      return get(endpoints.whoami, context)
    },
    async create () {
      const newReader = {
        type: 'Person',
        summary: `Reader profile`
      }
      try {
        const csrfToken = getToken()
        const response = await fetchWrap(endpoints.readers, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(newReader),
          headers: new global.Headers({
            'content-type': 'application/ld+json',
            'csrf-token': csrfToken
          })
        })
        const reader = await get(
          response.headers.get('location'),
          context,
          global
        )
        context.profile = reader
        return reader
      } catch (err) {
        err.httpMethod = 'POST/Create Profile'
        throw err
      }
    }
  }
}

async function getProfile (context, global) {
  if (context.profile) {
    return context.profile
  }
  const response = await global.fetch(endpoints.whoami, {
    headers: new global.Headers({
      'content-type': 'application/ld+json'
    })
  })
  if (response.ok) {
    context.profile = await response.json()
  } else if (response.status === 404) {
    const newReader = {
      type: 'Person',
      summary: `Reader profile`
    }
    try {
      const csrfToken = getToken()
      const response = await fetchWrap(endpoints.readers, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(newReader),
        headers: new global.Headers({
          'content-type': 'application/ld+json',
          'csrf-token': csrfToken
        })
      })
      const reader = await get(
        enpoints.url(response.headers.get('location')),
        context,
        global
      )
      context.profile = reader
    } catch (err) {
      err.httpMethod = 'POST/Create Profile'
      throw err
    }
  } else {
    global.alert('Logging in failed')
  }
  return context.profile
}

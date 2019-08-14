const PREFIX = '/api'
export const endpoints = {
  whoami: `${PREFIX}/whoami`,
  readers: `${PREFIX}/readers`,
  notes: `${PREFIX}/`,
  url (id, path = '') {
    const url = new URL(id, window.location)
    return `${PREFIX}${url.pathname}${path}`
  }
}

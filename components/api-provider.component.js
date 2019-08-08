import { createContext } from 'haunted'
import { createAPI } from './api.state.js'

export const api = createAPI()

export const ApiContext = createContext(api)

try {
  window.customElements.define('api-provider', ApiContext.Provider)
} catch (err) {
  console.log(err)
}

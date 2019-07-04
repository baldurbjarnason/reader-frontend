import { html } from 'lit-html'
import { component, useContext, useState, useEffect } from 'haunted'
import { ApiContext } from '../api-provider.component.js'
import { createAPI } from '../api.state.js'
import { classMap } from 'lit-html/directives/class-map.js'
import '../widgets/button.js'
import '../widgets/dropdown.js'
import { iconButton } from '../widgets/icon-button.js'
import '../modals/menu-modal.js'
import './book-list.js'
import './ink-collection-modal.js'
import { opener } from '../utils/create-modal.js'
// function animationPromise (elem) {
//   return new Promise((resolve, reject) => {
//     function animation (event) {
//       elem.removeEventListener('transitionend', animation)
//       resolve()
//     }
//     elem.addEventListener('animationend', animation, {once: true})
//   })
// }

export const title = 'Collection: `<ink-collection>`'

export const description = `The upload section of the recents view`

// http://localhost:8080/demo/?component=/components/library/collection.js
export const preview = () => {
  const api = createAPI()

  const books = [
    {
      name: 'Book Title 1',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }],
      resources: [{ rel: ['cover'], url: '/static/placeholder-cover.png' }]
    },
    {
      name: 'Book Title 2',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    },
    {
      name: 'Book Title 3',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    },
    {
      name: 'Book Title 4',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }],
      resources: [{ rel: ['cover'], url: '/static/placeholder-cover.png' }]
    },
    {
      name: 'Book Title 5',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    },
    {
      name: 'Book Title 6',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }],
      resources: [{ rel: ['cover'], url: '/static/placeholder-cover.png' }]
    },
    {
      name: 'Book Title 7',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    },
    {
      name: 'Book Title 8',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    },
    {
      name: 'Book Title 9',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }],
      resources: [{ rel: ['cover'], url: '/static/placeholder-cover.png' }]
    },
    {
      name: 'Book Title 10',
      id: 'https://example.com/id',
      attributedTo: [{ name: 'Fancy Author' }]
    }
  ]
  api.library = params => {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({ totalItems: 100, items: books, page: params.page || 1 }),
        3000
      )
    })
  }
  return html`<api-provider .value=${api}>
    <ink-collection></ink-collection>
  </api-provider>
`
}

function setLibrary ({
  collection,
  viewConfig,
  setViewConfig,
  library,
  setState,
  api
}) {
  if (collection !== 'all') {
    viewConfig.params.stack = collection
    viewConfig.name = collection
  } else {
    delete viewConfig.params.stack
  }
  if (library.state !== 'loading') {
    library.state = 'loading'
    setState(library)
  }
  setViewConfig(viewConfig)
  return api.library(viewConfig.params).then(library => {
    library.state = 'loaded'
    setState(library)
  })
}
function defaultViewConfig (collection) {
  const viewConfig = {
    name: collection || 'All',
    params: {
      limit: 100,
      page: 1
    }
  }
  if (collection !== 'all') {
    viewConfig.params.stack = collection
  } else {
    delete viewConfig.params.stack
  }
  return viewConfig
}

export const InkCollection = ({ collection }) => {
  const api = useContext(ApiContext)
  const [viewConfig, setViewConfig] = useState(defaultViewConfig(collection))
  const [library, setState] = useState({ state: 'loading', items: [], page: 1 })
  const [button, setButton] = useState({ loading: false })
  let tag
  if (library.tags) {
    tag = library.tags.filter(tag => tag.name === collection)[0]
  }
  useEffect(
    () => {
      setLibrary({
        collection,
        viewConfig,
        setViewConfig,
        library,
        setState,
        api
      })
    },
    [collection]
  )
  return html`
  <div class=${classMap({
    'header-row': true
  })}><span class="label">${library.items.length ||
    ''} Items</span> <span>${iconButton({
  click: event => {
    console.log(event.target, event.currentTarget)
    opener(
      'ink-collection',
      { viewConfig, setViewConfig, library, setState, api, tag },
      null,
      event.target
    )
  },
  name: 'settings',
  label: 'Settings'
})}</span>
</div><div class=${classMap({
    items: true,
    loading: library.state === 'loading',
    loaded: library.state === 'loaded',
    changing: library.state === 'changing',
    changed: library.state === 'changing',
    complete: library.totalItems === library.items.length
  })}>${loader(library.state)}<book-list @animationend=${event =>
  removeAnimationClasses(event)} .books=${library.items}></book-list>
<ink-button secondary class="loader" ?working=${button.loading} ?disabled=${
  button.loading
} @click=${async event => {
  setButton({ loading: true })
  try {
    const libraryAdditions = await api.library(
      Object.assign({}, viewConfig.params, { page: library.page + 1 })
    )
    const newLibrary = Object.assign({}, library, libraryAdditions)
    newLibrary.items = library.items.concat(libraryAdditions.items)
    setState(newLibrary)
  } catch (err) {
    console.error(err)
  }
  setButton({ loading: false })
}} name="Show More...">Show More...</ink-button>
</div>`
}

function removeAnimationClasses (event) {
  const path = event.composedPath()
  const parent = path[0].parentElement
  const classNames = ['changing', 'loaded']
  classNames.forEach(className => {
    if (parent.classList.contains(className)) {
      parent.classList.remove(className)
    }
  })
}

function loader (state) {
  if (state === 'loading') {
    return html`<svg class="loading-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
  }
}
InkCollection.observedAttributes = ['collection']

window.customElements.define(
  'ink-collection',
  component(InkCollection, window.HTMLElement, { useShadowDOM: false })
)

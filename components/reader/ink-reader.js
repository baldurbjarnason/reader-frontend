import { html } from 'lit-html'
import { component, useState, useEffect, useContext } from 'haunted'
import { ApiContext } from '../api-provider.component.js'
import lifecycle from 'page-lifecycle/dist/lifecycle.mjs'
import { HighlightButton, RemoveHighlightButton } from './highlight.js'
import quicklink from 'quicklink/dist/quicklink.mjs'
import '../widgets/icon-link.js'
import './reader-head.js'
import './contents-modal.js'
import './readable-chapter.js'

export const Reader = el => {
  const { req } = el
  const api = useContext(ApiContext)
  const [book, setBook] = useState({
    type: 'loading',
    json: {},
    name: '',
    readingOrder: []
  })
  useEffect(
    () => {
      if (req.params.bookId && book.bookId !== req.params.bookId) {
        el.updateComplete = api.book
          .get(`/${req.params.bookId}`)
          .then(book => {
            book.bookId = req.params.bookId
            setBook(book)
          })
          .catch(err => console.error(err))
      }
    },
    [req]
  )
  useEffect(
    () => {
      if (book.json.epubVersion) {
        el.dataset.format = 'epub'
      } else if (book.json.pdfInfo) {
        el.dataset.format = 'pdf'
      }
      function handleLifeCycle (event) {
        const root = document.querySelector('ink-chapter, ink-pdf')
        const current = root.getAttribute('current')
        const chapter = root.getAttribute('chapter')
        if (
          lifecycle.state === 'passive' &&
          event.oldState === 'active' &&
          current
        ) {
          api.book.savePosition(book, chapter, current)
        }
      }
      lifecycle.addEventListener('statechange', handleLifeCycle)
      if (book && book.id) {
        const rootPath = new URL(book.id).pathname
        const urls = book.resources
          .map(item => `${rootPath}${item.url}`)
          .filter(uri => !uri.includes('.epub'))
          .filter(uri => !uri.includes('.opf'))
        window.requestAnimationFrame(() => {
          quicklink({ urls }).catch(err => console.error(err))
        })
      }
      return () => {
        lifecycle.removeEventListener('statechange', handleLifeCycle)
      }
    },
    [book]
  )
  const [selectionRange, setSelection] = useState({})
  const [selectedHighlight, setHighlight] = useState({})
  let chapter, view, location
  if (req.params.bookPath) {
    chapter = `/${req.params.bookId}/${req.params.bookPath}`
    location = req.hash.replace('#', '')
  } else if (book.navigation && book.navigation.current) {
    chapter = book.navigation.current.path
    location = book.navigation.current.location
  }
  if (book.type === 'loading') {
    view = () => html`<div class="Loading"></div>`
  } else if (book.json.epubVersion) {
    if (document.head.createShadowRoot || document.head.attachShadow) {
      view = () =>
        html`<ink-chapter .setSelection=${setSelection} .setHighlight=${setHighlight} chapter=${chapter} location=${location} .book=${book}></ink-chapter>`
    } else {
      view = () =>
        html`<readable-chapter .setSelection=${setSelection} .setHighlight=${setHighlight} chapter=${chapter} location=${location} .book=${book}></readable-chapter>`
    }
  } else if (book.json.pdfInfo) {
    view = () => html`<ink-pdf .setSelection=${setSelection} .setHighlight=${setHighlight}  chapter=${chapter} location=${location} .api=${api}>
    <div><div id="viewer" class="pdfViewer">
      </div></div></ink-pdf>`
  }
  let navigation
  if (book.id) {
    navigation = addNav(book, req.params.bookId, req.params.bookPath)
  }
  let previous, next
  if (navigation && navigation.previous) {
    previous = `/reader${navigation.previous.path}`
  }
  if (navigation && navigation.next) {
    next = `/reader${navigation.next.path}`
  }
  book.navigation = navigation
  return html`<style>
  ink-reader {
    display: block;
    padding: 0;
    --reader-left-margin: 32px;
    min-height: 100vh;
  }
  ink-reader ink-chapter {
    min-height: calc(100vh - 4rem);
  }
  ink-reader[data-format="epub"] {
    background-color: var(--reader-background-color);
  }
  upload-section {
    display: block;
    padding: 1rem;
  }
  </style><reader-head name=${book.name} .returnPath=${`/info/${
  req.params.bookId
}/`} .book=${book} .current=${req.params.bookPath}></reader-head>
  ${view()}
<nav class="Reader-menu App-menu App-menu--bottom App-menu App-menu--center">
  <ol class="App-menu-list">
  <li>${
  previous
    ? html`
    <icon-link name="left-chevron" label="Previous" href=${previous}></icon-link>`
    : ''
}</li>
<li class="App-menu-centre">
${HighlightButton(
    selectionRange,
    chapter,
    req.params.bookId
  )}${RemoveHighlightButton(selectedHighlight)}</li>
    <li>${
  next
    ? html`
    <icon-link name="right-chevron" label="Previous" href=${next}></icon-link>`
    : ''
}</li>
  </ol>
</nav>`
}
window.customElements.define(
  'ink-reader',
  component(Reader, window.HTMLElement, { useShadowDOM: false })
)

function addNav (book, bookId, bookPath) {
  const rootPath = new URL(book.id).pathname
  const navigation = {}
  const index = book.readingOrder
    .map(item => `${rootPath}${item.url}`)
    .indexOf(`/${bookId}/${bookPath}`)
  const nextItem = book.readingOrder[index + 1]
  if (nextItem) {
    navigation.next = {
      path: `${rootPath}${nextItem.url}`
    }
  }
  const prevItem = book.readingOrder[index - 1]
  if (prevItem) {
    navigation.previous = {
      path: `${rootPath}${prevItem.url}`
    }
  }
  return navigation
}

import { html } from 'lit-html'
import { component, useState, useEffect, useContext } from 'haunted'
import { navigate } from '../hooks/useRoutes.js'
import { ApiContext } from '../api-provider.component.js'
import { iconButton } from '../widgets/icon-button.js'
import { opener } from '../utils/create-modal.js'
import './delete-publication.js'

export const Info = el => {
  const { req } = el
  const api = useContext(ApiContext)
  const [tags, setTags] = useState([])
  useEffect(() => {
    api
      .library({ limit: 10 })
      .then(library => setTags(library.tags))
      .catch(err => console.error(err))
  }, [req])
  const [book, setBook] = useState({ type: 'loading', json: {} })
  const { resources = [], author = [], readingOrder = [] } = book
  const coverResource = resources.filter(resource =>
    resource.rel.includes('cover')
  )[0]
  let original, format
  if (book.json.epubVersion) {
    format = 'epub'
    original = `/${req.params.bookId}/original.epub`
  } else if (book.json.pdfInfo) {
    format = 'pdf'
    original = `/${req.params.bookId}/${readingOrder[0].url}`
  }
  let cover
  if (coverResource) {
    const url = new URL(book.id, window.location).pathname
    cover = `${url}${coverResource.url}?cover=true`
  } else {
    cover = '/static/placeholder-cover.jpg'
  }
  useEffect(() => {
    if (req.params.bookId) {
      el.updateComplete = api.book
        .get(`/${req.params.bookId}`)
        .then(book => {
          setBook(book)
        })
        .catch(err => console.error(err))
    }
  }, [])
  const { navigation = {} } = book
  let bookURL, continued
  if (navigation.current) {
    continued = book.position
    bookURL = `/reader${book.navigation.current.path}#${
      book.navigation.current.location
    }`
  } else if (resources[0]) {
    bookURL = `/reader${req.params.bookId}/${readingOrder[0].url}`
  }
  function tagRender (tag) {
    const bookTags = book.tags.map(tag => tag.id)
    return html`
      <li>
        <label
          ><input
            name=${tag.id}
            value=""
            type="checkbox"
            ?checked=${bookTags.includes(tag.id)}
            id=${tag.id}
            @change=${
              event => {
                const input = event.target
                let payload
                if (input.checked) {
                  payload = {
                    type: 'Add',
                    object: {
                      type: 'reader:Tag',
                      id: tag.id,
                      name: tag.name
                    },
                    target: {
                      type: 'Publication',
                      id: book.id
                    }
                  }
                } else {
                  payload = {
                    type: 'Remove',
                    object: {
                      type: 'reader:Tag',
                      id: tag.id,
                      name: tag.name
                    },
                    target: {
                      type: 'Publication',
                      id: book.id
                    }
                  }
                }
                api.activity
                  .save(payload)
                  .then(location => console.log(location))
                  .catch(err => console.error(err))
              }
            }
          />
          ${tag.name}</label
        >
      </li>
    `
  }
  return html`
    <info-head name=${book.name}></info-head>
    <div class="Cover">
      <img class="Cover-icon" alt="${book.description || ''}" src="${cover}" />
    </div>
    <div class="actions">
      <div class="BookCard-group">
        <h4 class="BookCard-title">${book.name}</h4>
        <p class="BookCard-paragraph">${author.map(attributionComponent)}</p>
        <p class="BookCard-total"></p>
      </div>
      <ol>
        <li>
          <a href="${bookURL}" class="actions-button"
            >${continued ? 'Continue' : 'Read'}</a
          >
        </li>
      </ol>
      <ol>
        <li>
          <a
            href="${`/annotations/${req.params.bookId}`}"
            class="actions-button"
            >Annotations &amp; Notes</a
          >
        </li>
        <li>
          <details class="actions-button actions-button--secondary"
            ><summary>Collections</summary>
            <ol>
              ${tags.map(tagRender)}
            </ol></details
          >
        </li>
        <li>
          <a
            href=${original}
            class="actions-button actions-button--secondary"
            download=${`${book.name}.${format}`}
            >Download Original</a
          >
        </li>
        <li>
          <a
            class="actions-button actions-button--secondary actions-button--dangerous"
            @click=${
              ev => {
                opener('delete-publication', { book })
              }
            }
            >Delete</a
          >
        </li>
      </ol>
    </div>
  `
}

const attributionComponent = attribution => {
  return html`
    <span class="BookCard-attribution">${attribution.name}</span>
  `
}
window.customElements.define(
  'ink-info',
  component(Info, window.HTMLElement, { useShadowDOM: false })
)

const InfoHead = ({ name }) => {
  return html`
    ${
      iconButton({
        click: ev => {
          navigate('/library')
        },
        name: 'cancel',
        label: 'Menu'
      })
    } <span class="menu-name">${name}</span> <span></span>
  `
}
InfoHead.observedAttributes = ['name']

window.customElements.define(
  'info-head',
  component(InfoHead, window.HTMLElement, { useShadowDOM: false })
)

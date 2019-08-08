import { html } from 'lit-html'
import { component, useState, useEffect, useContext } from 'haunted'
import { ApiContext } from '../api-provider.component'
import { iconButton } from '../widgets/icon-button.js'
import { opener } from '../utils/create-modal.js'

export const Library = el => {
  const { req } = el
  const api = useContext(ApiContext)
  let name, view
  if (req.params.collection) {
    name = req.params.collection
    view = () =>
      html`
        <ink-collection collection=${name}></ink-collection>
      `
  } else {
    name = 'Uploads'
    view = () =>
      html`
        <upload-section></upload-section>
      `
  }
  const [tags, setTags] = useState([])
  useEffect(() => {
    api
      .library({ limit: 10 })
      .then(library => setTags(library.tags))
      .catch(err => console.error(err))
  }, [req])
  useEffect(() => {
    api.events.on('tag', () => {
      api
        .library({ limit: 10 })
        .then(library => setTags(library.tags))
        .catch(err => console.error(err))
    })
  }, [])
  return html`
    <library-head
      name=${name}
      .collections=${tags}
      .current=${req.params.collection}
    ></library-head>
    ${view()}
  `
}
window.customElements.define(
  'ink-library',
  component(Library, window.HTMLElement, { useShadowDOM: false })
)

const LibraryHead = ({ name, collections, current }) => {
  return html`
    ${
      iconButton({
        click: ev => opener('collection-sidebar', { collections, current }),
        name: 'menu',
        label: 'Menu Sidebar'
      })
    } <span class="Library-name">${name}</span> <span></span>
  `
}
LibraryHead.observedAttributes = ['name']

window.customElements.define(
  'library-head',
  component(LibraryHead, window.HTMLElement, { useShadowDOM: false })
)

const UploadSection = el => {
  return html`
    <ink-uploader></ink-uploader>
    <recent-books></recent-books>
  `
}

window.customElements.define(
  'upload-section',
  component(UploadSection, window.HTMLElement, { useShadowDOM: false })
)

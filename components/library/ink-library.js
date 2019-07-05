import { html } from 'lit-html'
import { component, useState, useEffect, useContext } from 'haunted'
import { navigate } from '../hooks/useRoutes.js'
import { ApiContext } from '../api-provider.component.js'
import { iconButton } from '../widgets/icon-button.js'
import { opener } from '../utils/create-modal.js'

export const Library = el => {
  const { req } = el
  const api = useContext(ApiContext)
  let name, view
  if (req.params.collection) {
    name = req.params.collection
    view = () => html`<ink-collection collection=${name}></ink-collection>`
  } else {
    name = 'Uploads'
    view = () => html`<upload-section></upload-section>`
  }
  const [tags, setTags] = useState([])
  useEffect(
    () => {
      api
        .library({ limit: 10 })
        .then(library => setTags(library.tags))
        .catch(err => console.error(err))
    },
    [req]
  )
  useEffect(() => {
    api.events.on('tag', () => {
      api
        .library({ limit: 10 })
        .then(library => setTags(library.tags))
        .catch(err => console.error(err))
    })
  }, [])
  return html`<library-head name=${name} .collections=${tags} .current=${
    req.params.collection
  }></library-head>
  ${view()}

<ink-modal id="delete-collection" aria-hidden="true">
    <strong slot="modal-title" class="Modal-name">Delete Collection</strong>
    <confirm-action dangerous slot="modal-body" .action=${() => {
    return Promise.resolve()
      .then(() => {
        console.log(tags)
        if (tags) {
          const tag = tags.filter(
            tag => tag.name === req.params.collection
          )[0]
          return api.activity.delete(tag)
        }
      })
      .then(() => {
        document.getElementById('delete-collection').closer = true
        return navigate('/library')
      })
  }} name="Delete" .view=${() =>
  html`<p>Are you sure you want to delete this collection?</p><p>(This action will not delete the collection's items.)</p>`}></confirm-action></ink-modal>

<ink-modal id="sign-out" aria-hidden="true">
    <strong slot="modal-title" class="Modal-name">Sign Out</strong>
    <confirm-action slot="modal-body" .action=${() =>
    api.logout()} name="Sign Out" dangerous .view=${() =>
  'Are you sure that you want to sign out?'}></confirm-action></ink-modal>`
}
window.customElements.define(
  'ink-library',
  component(Library, window.HTMLElement, { useShadowDOM: false })
)

const LibraryHead = ({ name, collections, current }) => {
  return html`${iconButton({
    click: ev => opener('collection-sidebar', { collections, current }),
    name: 'menu',
    label: 'Menu Sidebar'
  })} <span class="Library-name">${name}</span> <span></span>`
}
LibraryHead.observedAttributes = ['name']

window.customElements.define(
  'library-head',
  component(LibraryHead, window.HTMLElement, { useShadowDOM: false })
)

const UploadSection = el => {
  return html`
  <ink-uploader></ink-uploader>
  <recent-books></recent-books>`
}

window.customElements.define(
  'upload-section',
  component(UploadSection, window.HTMLElement, { useShadowDOM: false })
)

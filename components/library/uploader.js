import { html } from 'lit-html'
import { useState, useEffect, component } from 'haunted'
import { api } from '../api-provider.component.js'
import { classMap } from 'lit-html/directives/class-map.js'
import '../../js/vendor/file-drop-element.js'
import '../widgets/button.js'
import '../modals/menu-modal.js'
import { createElement } from '../utils/create-element.js'
import { createModal, closer, opener } from '../utils/create-modal.js'
import { iconButton } from '../widgets/icon-button.js'

export const title = 'Uploader: `<ink-uploader>`'

export const description = `The upload section of the recents view`

// http://localhost:8080/demo/?component=/components/library/uploader.js
export const preview = () => {
  api.formats = {}
  api.formats.pdf = api.formats.epub = file => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ type: 'Publication', name: file.name }), 3000)
    })
  }
  api.library = () => {}
  return html`<api-provider .value=${api}>
    <ink-uploader></ink-uploader>
  </api-provider>
`
}
export const render = () => {
  const [files, setQueue] = useState(api.uploads.files)
  useEffect(() => {
    api.events.on('imported', () => setQueue(api.uploads.files))
    api.events.on('importing', () => setQueue(api.uploads.files))
    api.events.on('queue-empty', () => setQueue(api.uploads.files))
  }, [])
  return html`<style>
  </style><div class=${classMap({
    'header-row': true,
    uploading: files.size !== 0
  })}><p>Upload file</p>
  <ink-button @click=${event => {
    opener('ink-uploader', {}, null, event.target)
  }} dropdown secondary compact name=${'Uploading ' +
    files.size}></ink-button></div><file-drop accept=".epub,.pdf,application/epub+zip,application/pdf" multiple @filedrop=${event =>
  fileDrop(event.files, api)}>
  <p>Drop file here</p>
  <p>or</p>
  <p class="input">
    <input type="file" name="file-selector" id="file-selector" accept=".epub,.pdf,application/epub+zip,application/pdf" multiple @change=${event =>
    fileDrop(event.target.files, api)}>
  </p>
</file-drop>`
}

const InkUploader = createElement(render, {})

export const UploaderBody = component(
  () => {
    const [files, setQueue] = useState(api.uploads.files)
    useEffect(() => {
      api.events.on('imported', () => setQueue(api.uploads.files))
      api.events.on('importing', () => setQueue(api.uploads.files))
      api.events.on('queue-empty', () => setQueue(api.uploads.files))
    }, [])
    useEffect(() => {
      if (files.size === 0) {
        closer()
      }
    })
    return html`<header class="ModalHeader">
    ${iconButton({
    click: () => closer(),
    name: 'cancel',
    label: 'Close Menu'
  })}
  <h2 class="ModalHeader-title">${files.size} Items</h2>
  <div></div>
</header>
<div id="modal-1-content" class="content">
  <ol slot="modal-body">${Array.from(files).map(
    file => html`<li class="MenuItem">${file.name}</li>`
  )}</ol>
</div>`
  },
  window.HTMLElement,
  { useShadowDOM: false }
)

window.customElements.define('uploader-modal-body', UploaderBody)

createModal(
  'ink-uploader',
  () => html`<uploader-modal-body></uploader-modal-body>`,
  { popper: true }
)

window.customElements.define('ink-uploader', InkUploader)

function fileDrop (files, api) {
  for (let file of files) {
    api.uploads.add(file)
  }
}

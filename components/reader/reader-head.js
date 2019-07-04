import { html } from 'lit-html'
import { createElement } from '../utils/create-element.js'
import { opener } from '../utils/create-modal.js'
import '../widgets/icon-link.js'
import { iconButton } from '../widgets/icon-button.js'

const render = ({ name, returnPath, book, current }) => {
  return html`<ol class="App-menu-list">
    <li>${iconButton({
    label: 'Contents',
    click: ev => {
      opener('ink-contents', { book, current, returnPath }, 'Contents')
    },
    name: 'vertical-ellipsis'
  })}</li>
    <li class="App-menu-centre"><span class="menu-name">${name}</span></li>
    <li></li>
  </ol>`
}

const ReaderHead = createElement(render, {
  observedAttributes: ['name', 'returnPath']
})
window.customElements.define('reader-head', ReaderHead, {
  useShadowDOM: false
})

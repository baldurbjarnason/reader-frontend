import { html } from 'lit-html'
import { createElement } from '../utils/create-element.js'
import { opener } from '../utils/create-modal.js'
import '../widgets/icon-link.js'

const render = ({ name, returnPath, book, current }) => {
  return html`<ol class="App-menu-list">
    <li><button aria-label="Contents" @click=${ev => {
    opener('ink-contents', { book, current, returnPath }, 'Contents')
  }}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg></button></li>
    <li class="App-menu-centre"><span class="menu-name">${name}</span></li>
    <li></li>
  </ol>`
}

const ReaderHead = createElement(render, {
  observedAttributes: ['name', 'returnPath']
})
window.customElements.define('reader-head', ReaderHead)

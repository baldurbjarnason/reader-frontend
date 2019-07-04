import { createModal, closer } from '../utils/create-modal.js'
import { html } from 'lit-html'

const renderer = ({ book, current, returnPath }, config) => {
  return html`<header class="ModalHeader">
  <icon-button name="cancel" @click=${() =>
    closer()} data-autofocus="true">Close Menu</icon-button>
  <h2 class="ModalHeader-title" data-autofocus="true">Contents</h2>
  <span></span>
</header>
    <p><a href=${returnPath} class="actions-button actions-button--secondary" @click=${() =>
  closer()}>&lt; Return</a></p>
<ink-contents id="modal-1-content" class="content" .book=${book} .current=${current} @click=${event =>
  closer()}>
</ink-contents>`
}

createModal('ink-contents', renderer, {})

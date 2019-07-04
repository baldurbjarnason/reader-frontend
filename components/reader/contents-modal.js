import { createModal, closer } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { iconButton } from '../widgets/icon-button.js'

const renderer = ({ book, current, returnPath }, config) => {
  return html`<header class="ModalHeader">
    ${iconButton({
    name: 'cancel',
    click: () => closer(),
    autofocus: true,
    label: 'Close Menu'
  })}
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

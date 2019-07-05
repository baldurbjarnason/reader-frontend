import { closer } from '../utils/create-modal.js'
import { virtual } from 'haunted'
import { html } from 'lit-html'
import { iconButton } from './icon-button.js'

export const modalHeader = virtual(({ title, autofocus }) => {
  return html`<header class="ModalHeader">
  ${iconButton({
    name: 'cancel',
    click: () => closer(),
    autofocus
  })}
<h2 class="ModalHeader-title" ?data-autofocus=${autofocus}>${title}</h2>
<span></span>
</header>`
})

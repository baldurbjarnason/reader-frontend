import { html } from 'lit-html'
import { component, useState } from 'haunted'
import { close } from '../hooks/useModal.js'
import '../widgets/button.js'
import '../widgets/text-button.js'
import './modal.js'

export const title = 'Confirm Action modal body: `<confirm-action>`'

export const description = `This is the body of the sign out modal.`

// http://localhost:8080/demo/?component=/components/modals/confirm-action.js
export const preview = () => {
  async function logout () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ done: true }), 3000)
    })
  }
  return html`<ink-button @click=${() => {
    document.getElementById('modal-1').open = true
  }}>open modal</ink-button><ink-modal id="modal-1" aria-hidden="true">
    
  <strong slot="modal-title" class="Modal-name">Sign Out</strong>
  <confirm-action slot="modal-body" .action=${logout} name="Sign Out" question="" dangerous>Are you sure that you want to sign out?</confirm-action></ink-modal>
  <ink-button @click=${() => {
    document.getElementById('modal-2').open = true
  }}>open modal</ink-button><ink-modal id="modal-2" aria-hidden="true">
    
  <strong slot="modal-title" class="Modal-name">Create Collection</strong>
  <confirm-action slot="modal-body" .action=${logout} name="Create"><label class="Label">Name<br><input type="text" name="collection-name" id="collection-name"></label></confirm-action></ink-modal>`
}

export const ConfirmBody = ({ action, name, dangerous }) => {
  const [working, setWorking] = useState(false)
  return html`
  <style>
  :host {
    display: block;
    padding: 0.5rem 1rem !important;
  }
  :host([dangerous]) {
    border-bottom: 0.5rem solid #af4014;
  }

  .Modal-paragraph {
  text-align: center;
  margin: 0.5rem 0 1rem;
}
.Modal-name {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.25;
  box-sizing: border-box;
  text-transform: uppercase;
  margin: 0 2rem 1rem;
  text-align: center;
  display: block;
}

.Modal-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}
  </style>
  <p class="Modal-paragraph"><slot></slot></p>
  <div class="Modal-row"><text-button closer>Cancel</text-button> <ink-button ?working=${working} ?disabled=${working} ?dangerous=${dangerous} @click=${() => {
  action().then(() => {
    setWorking(false)
    close()
  })
  setWorking(true)
}}>${name}</ink-button></div>`
}
ConfirmBody.observedAttributes = ['name', 'question', 'dangerous']

window.customElements.define(
  'confirm-action',
  component(ConfirmBody, window.HTMLElement, {
    shadowRootInit: { delegatesFocus: true }
  })
)

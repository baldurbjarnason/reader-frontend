import { html } from 'lit-html'
import { component, useState } from 'haunted'
import { closer } from '../utils/create-modal.js'
import '../widgets/button.js'
import '../widgets/text-button.js'

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
  }} name="open modal">open modal</ink-button><ink-modal id="modal-1" aria-hidden="true">
    
  <strong slot="modal-title" class="Modal-name">Sign Out</strong>
  <confirm-action slot="modal-body" .action=${logout} name="Sign Out" question="" dangerous .view=${() =>
  'Are you sure that you want to sign out?'}></confirm-action></ink-modal>
  <ink-button @click=${() => {
    document.getElementById('modal-2').open = true
  }} name="open modal">open modal</ink-button><ink-modal id="modal-2" aria-hidden="true">
    
  <strong slot="modal-title" class="Modal-name">Create Collection</strong>
  <confirm-action slot="modal-body" .action=${logout} name="Create" .view=${() =>
  html`<label class="Label">Name<br><input type="text" name="collection-name" id="collection-name"></label>`}></confirm-action></ink-modal>`
}

export const ConfirmBody = ({ action, name, dangerous, view }) => {
  const [working, setWorking] = useState(false)
  return html`
  <div class="Modal-paragraph">${view && view()}</div>
  <div class="Modal-row"><text-button .click=${() =>
    closer()} name="Cancel"></text-button> <ink-button ?working=${working} ?disabled=${working} ?dangerous=${dangerous} .click=${() => {
  setWorking(true)
  return action().then(() => {
    setWorking(false)
    closer()
  })
}} name=${name}>${name}</ink-button></div>`
}
ConfirmBody.observedAttributes = ['name', 'question', 'dangerous']

window.customElements.define(
  'confirm-action',
  component(ConfirmBody, window.HTMLElement, { useShadowDOM: false })
)

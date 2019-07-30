import { createModal } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { modalHeader } from '../widgets/modalHeader.js'
import { api } from '../api-provider.js'
const renderer = () => {
  return html`
  ${modalHeader({ title: 'Sign Out' })}
  <confirm-action .action=${() =>
    api.logout()} name="Sign Out" dangerous .view=${() =>
  'Are you sure that you want to sign out?'}></confirm-action>`
}

createModal('sign-out', renderer)

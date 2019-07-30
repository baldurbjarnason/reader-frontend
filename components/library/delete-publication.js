import { createModal, closer } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { modalHeader } from '../widgets/modalHeader.js'
import { navigate } from '../hooks/useRoutes.js'
import { api } from '../api-provider.js'

const renderer = ({ book }) => {
  return html`
  ${modalHeader({ title: 'Delete Publication' })}
  <confirm-action dangerous slot="modal-body" .action=${() => {
    return Promise.resolve()
      .then(() => {
        if (book) {
          return api.activity.delete(book)
        }
      })
      .then(() => {
        closer()
        return navigate('/library')
      })
  }} name="Delete" .view=${() =>
  html`<p>Are you sure you want to delete this publication?</p>`}></confirm-action>`
}

createModal('delete-publication', renderer)

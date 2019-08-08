import { createModal, closer } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { modalHeader } from '../widgets/modalHeader.js'
import { navigate } from '../hooks/useRoutes.js'
import { api } from '../api-provider.component.js'

const renderer = ({ tag }) => {
  return html`
    ${modalHeader({ title: 'Delete Collection' })}
    <confirm-action
      dangerous
      slot="modal-body"
      .action=${
        () => {
          return Promise.resolve()
            .then(() => {
              if (tag) {
                return api.activity.delete(tag)
              }
            })
            .then(() => {
              closer()
              return navigate('/library')
            })
        }
      }
      name="Delete"
      .view=${
        () =>
          html`
            <p>Are you sure you want to delete this collection?</p>
            <p>(This action will not delete the collection's items.)</p>
          `
      }
    ></confirm-action>
  `
}

createModal('delete-collection', renderer)

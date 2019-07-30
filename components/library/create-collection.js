import { createModal } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { modalHeader } from '../widgets/modalHeader.js'
import { navigate } from '../hooks/useRoutes.js'
import { api } from '../api-provider.js'

const renderer = () => {
  return html`
  ${modalHeader({ title: 'Create Collection' })}
  <confirm-action .action=${() => {
    const name = document.getElementById('collection-name').value
    document.getElementById('collection-name').value = ''
    const tag = {
      type: 'reader:Tag',
      tagType: 'reader:Stack',
      name
    }
    return api.activity.create(tag).then(() => {
      api.events.emit('tag')
      navigate(`/library/${encodeURIComponent(name)}`)
    })
  }} name="Create" .view=${() =>
  html`<label class="Label">Name<br><input type="text" name="collection-name" id="collection-name" autofocus></label>`}></confirm-action>`
}

createModal('create-collection', renderer)

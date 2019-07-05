import { createModal, closer, opener } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { iconButton } from '../widgets/icon-button.js'
import './delete-collection.js'

export const renderer = ({
  viewConfig = {},
  setViewConfig = {},
  library = {},
  setState,
  api,
  tag
}) => {
  const options = [
    {
      text: 'Newest first',
      value: 'datePublished',
      selected: true
    },
    {
      text: 'Oldest first',
      value: 'datePublished-reversed',
      selected: false
    },
    {
      text: 'A-Z',
      value: 'title',
      label: 'Alphabetical, ascending',
      selected: false
    },
    {
      text: 'Z-A',
      value: 'title-reversed',
      label: 'Alphabetical, descending',
      selected: false
    }
  ]
  function onSelectChange (event) {
    const path = event.composedPath()
    const target = path[0]
    const value = target.value.split('-')
    let newOrder
    if (value[0] === 'datePublished') {
      newOrder = {
        page: 1
      }
      if (value[1]) {
        newOrder.reverse = 'true'
      }
    } else {
      newOrder = {
        orderBy: value[0],
        page: 1
      }
      if (value[1]) {
        newOrder.reverse = 'true'
      }
    }
    const newParams = Object.assign({}, viewConfig.params, newOrder)
    const newConfig = Object.assign({}, viewConfig, { params: newParams })
    return getChanges(newConfig, setState).catch(err => console.error(err))
  }
  async function getChanges (newConfig) {
    library.state = 'changing'
    setState(library)
    try {
      const newLibrary = await api.library(
        Object.assign({}, newConfig.params, { page: library.page })
      )
      newLibrary.state = 'loaded'
      setViewConfig(newConfig)
      setState(newLibrary)
    } catch (err) {
      console.error(err)
    }
  }
  return html`<header class="ModalHeader">
    ${iconButton({
    name: 'cancel',
    click: () => closer(),
    autofocus: true
  })}
  <h2 class="ModalHeader-title" data-autofocus="true">View Settings for &lsquo;${
  viewConfig.name
}&rsquo;</h2>
  <span></span>
</header><div slot="modal-body" class="Stack Stack--centered"><form><p style="text-align: center;"><ink-dropdown .change=${onSelectChange} .options=${options}>Ordered by </ink-dropdown></p></form>
  <ink-button ?hidden=${!tag} .click=${() => {
  const modal = document.getElementById('delete-collection')
  if (modal) {
    modal.open = true
  }
  opener('delete-collection', { tag })
}} name="Remove Collection">Remove Collection</ink-button></div>`
}

createModal('ink-collection', renderer, { popper: true })

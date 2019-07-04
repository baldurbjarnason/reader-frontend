import { html } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map.js'
import { virtual } from 'haunted'
// import './modal-closer.js'
import '../widgets/button.js'
import { iconButton } from '../widgets/icon-button.js'
import { createModal, closer, opener } from '../utils/create-modal.js'

export const title = 'Collection Sidebar: `<collection-sidebar>`'

export const description = `Primary navigation for the menu.`

// http://localhost:8080/demo/?component=/components/library/collection-sidebar.js&imports=/test/test-files/test-tags.js
export const preview = () => {
  return html`<ink-button .click=${() => {
    opener('collection-sidebar', { collections: window.testTags })
  }} name="open modal">open modal</ink-button><ink-button .click=${() => {
    opener('collection-sidebar', {
      collections: window.testTags,
      current: 'This is a test collection'
    })
  }} name="open modal"></ink-button>`
}

export const collectionSidebar = virtual(({ collections = [], current }) => {
  return html`
        <header>
          ${iconButton({
    name: 'cancel',
    click: () => closer(),
    label: 'Close Menu'
  })}
          <h2 class="title" data-autofocus="true">Collections</h2>
          ${iconButton({
    name: 'plus',
    'data-modal-close': true,
    label: 'Create Collection',
    click: ev => {
      const modal = document.getElementById('create-collection')
      if (modal) {
        modal.open = true
      }
    }
  })}
        </header>
        <div id="modal-1-content" class="content">
        <ol class="list">${uploadView(current, closer)}${allView(
  current,
  closer
)}
  ${collections.map(tag => tagView(tag, current, closer))}</ol>
        </div>
        <ink-button data-modal-close @click=${ev => {
    const modal = document.getElementById('sign-out')
    if (modal) {
      modal.open = true
    }
  }} class="sign-out" name="Sign Out">Sign Out</ink-button>
      </div>
    </div>`
})

createModal('collection-sidebar', collectionSidebar)

// These should handle aria-current
const uploadView = (current, closer) => {
  return html`<li><a class="${classMap({
    item: true,
    selected: !current
  })}" aria-current=${
    !current ? 'page' : 'false'
  } href="/library" @click=${() =>
    closer()}><span class="label">Uploads</span></a></li>`
}

// These should handle aria-current
const allView = (current, closer) => {
  return html`<li><a class="${classMap({
    item: true,
    selected: current === 'all'
  })}" aria-current=${
    current === 'all' ? 'page' : 'false'
  } href="/library/all" @click=${() =>
    closer()}><span class="label">All Items</span></a></li>`
}

const tagView = (tag, current, closer) => {
  return html`<li><a class="${classMap({
    item: true,
    selected: tag.name === current
  })}" aria-current=${current ? 'page' : 'false'} href="${`/library/${
    tag.name
  }`}" @click=${() => closer()}><span class="label">${tag.name}</span></a></li>`
}

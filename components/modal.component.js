import { html } from 'lit-html'
import { useModal } from './hooks/useModal.js'
import { classMap } from 'lit-html/directives/class-map.js'
import { component, useEffect } from 'haunted'

export const title = 'Modal: `<ink-modal>`'

export const description = `The the modal card, wraps its light-dom in a modal`

// http://localhost:8080/demo/?component=/components/modal.component.js&imports=/components/modal-closer.component.js
export const preview = () => {
  return html`<button @click=${() => {
    document.getElementById('modal-1').open = true
  }}>open modal</button><button @click=${() => {
    document.getElementById('modal-2').open = true
  }}>open bigger</button><ink-modal id="modal-1" aria-hidden="true"><strong slot="modal-title">Fancy Title</strong><p slot="modal-body" style="padding: 1rem;">Fancy body</p></ink-modal><ink-modal full id="modal-2" aria-hidden="true"><strong slot="modal-title">Full Screen Title</strong><p slot="modal-body" style="padding: 1rem;">Fancy body</p></ink-modal>`
}

export const InkModal = ({ open, full }) => {
  const [opener] = useModal()
  useEffect(
    () => {
      if (open) {
        opener()
      }
    },
    [open]
  )
  return html`<style>

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
}
.overlay.full {
  align-items: inherit;
  justify-content: inherit;
}

header {
  border-bottom: 1px solid #ddd;
}

.container {
  background-color: #fff;
  max-width: 95vw;
  max-height: 100vh;
  min-width: 300px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 14px -2px rgba(0,0,0,0.15);
}
.full .container {
  width: 100%;
  max-width: 100vw;
}

.content {
  display: flex;
  flex-direction: column;
}
.content > * {
  margin: auto;
}

.title {
  font-weight: 600;
  font-size: 0.75rem;
  line-height: 1;
  box-sizing: border-box;
  text-transform: uppercase;
  padding: 1rem 2rem;
  text-align: center;
  margin: 0;
}

.row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.text {
  margin: 2rem;
}
  </style>
    <div tabindex="-1" class=${classMap({
    overlay: true,
    full
  })} data-modal-close>
      <div role="dialog" class="container" aria-modal="true" aria-labelledby="modal-1-title" >
        <header>
          <h2 class="title"><slot name="modal-title" id="title">Title</slot></h2>
          <ink-modal-closer></ink-modal-closer>
        </header>
        <div id="modal-1-content" class="content"><slot name="modal-body">Body</slot>
        </div>
      </div>
    </div>`
}

InkModal.observedAttributes = ['full']

window.customElements.define(
  'ink-modal',
  component(InkModal, window.HTMLElement)
)

import { html } from 'lit-html'
import { useModal } from './hooks/useModal.js'
import { classMap } from 'lit-html/directives/class-map.js'
import { component, useEffect } from 'haunted'

export const title = 'Modal: `<ink-modal>`'

export const description = `The the modal card, wraps its light-dom in a modal`

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

.close {
  position: absolute;
  top: 0.8rem;
  left: 0.5rem;
  font-size: 1.25rem;
  line-height: 1rem;
  transform: translateY(-2px);
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-align: center;
  white-space: nowrap;
  text-decoration: none;
  text-transform: uppercase;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  border: none;
  background-color: transparent;
  color: var(--rc-main);

  height: 30px;
    width: 30px;
    margin: 0;
    padding: 0;
}
@keyframes outlinePop {
  0% {
    transform: scale(100%);
    stroke-width: 1px;
  }
  50% {
    transform: scale(200%);
    stroke-width: 8px;
  }
  100% {
    transform: scale(100%);
    stroke-width: 3px;
  }
}
.close:focus {
  background-image: radial-gradient(circle closest-side, #f7f7f7 0%, #f7f7f7 95%, white );
  outline: none;
}
.close:focus svg {
  animation: outlinePop 0.25s ease-in-out;
  stroke-width: 3px;
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
          <button aria-label="Close modal" class="close" data-modal-close><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
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
import { html } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map.js'
import { createElement } from '../utils/create-element.js'

export const title = 'Button: `<ink-button>`'

export const description = `The default button`
// http://localhost:8080/demo/?component=/components/widgets/button.js
export const preview = () => {
  return html`<ink-button name="Fancy Button">Fancy Button</ink-button> <ink-button secondary name="Secondary Button">Secondary Button</ink-button><ink-button disabled name="Dropdown Button">Disabled Button</ink-button><ink-button dropdown name="Dropdown Button">Dropdown Button</ink-button><ink-button dropdown secondary name="Dropdown Button">Dropdown Button</ink-button><ink-button dropdown compact secondary name="Dropdown Button">Dropdown Button</ink-button><ink-button dropdown compact name="Dropdown Button">Dropdown Button</ink-button><ink-button working name="Fetching">Fetching</ink-button><ink-button working secondary name="Fetching">Fetching</ink-button>`
}

export const render = el => {
  const {
    disabled,
    secondary,
    dropdown,
    compact,
    working,
    dangerous,
    name,
    click
  } = el
  return html`
      <button ?disabled=${disabled} class=${classMap({
  secondary,
  dropdown,
  compact,
  working,
  dangerous
})} ?data-modal-close=${el['data-modal-close']} @click=${click}>${name} ${
  working
    ? html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
    : ''
}</button>`
}

const InkButton = createElement(render, {
  observedAttributes: [
    'disabled',
    'secondary',
    'dropdown',
    'compact',
    'working',
    'dangerous',
    'data-modal-close',
    'name'
  ]
})

window.customElements.define('ink-button', InkButton)

import { html } from 'lit-html'
import { classMap } from 'lit-html/directives/class-map.js'
import { createElement } from '../utils/create-element.js'

export const title = 'Text Button: `<text-button>`'

export const description = `The default text button`
// http://localhost:8080/demo/?component=/components/widgets/text-button.js
export const preview = () => {
  return html`<text-button name="Fancy Button"></text-button> <text-button secondary>Secondary Button</text-button><text-button disabled name="Dropdown Button">Disabled Button</text-button><text-button dropdown> name="Dropdown Button"Dropdown Button</text-button><text-button dropdown secondary name="Dropdown Button">Dropdown Button</text-button><text-button dropdown compact secondary name="Dropdown Button">Dropdown Button</text-button><text-button dropdown compact name="Dropdown Button">Dropdown Button</text-button><text-button working name="Fetching">Fetching</text-button><text-button working secondary name="Fetching">Fetching</text-button>`
}

export const render = ({
  disabled,
  secondary,
  dropdown,
  compact,
  working,
  dangerous,
  closer,
  name
}) => {
  return html`
      <button ?disabled=${disabled} class=${classMap({
  secondary,
  dropdown,
  compact,
  working,
  dangerous
})} ?data-modal-close=${closer}>${name} ${
  working
    ? html`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
    : ''
}</button>`
}

const TextButton = createElement(render, {
  observedAttributes: ['disabled', 'dangerous', 'working', 'closer', 'name']
})

window.customElements.define('text-button', TextButton)

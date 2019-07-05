import { html } from 'lit-html'
import { component, useContext, useState, useEffect } from 'haunted'
import { ApiContext } from '../api-provider.component.js'

export const title = 'Ink Contents display: `<ink-contents>`'

export const description = `This renders the book's content HTML`

// http://localhost:8080/demo/?component=/components/reader/ink-contents.js
export const preview = () => {
  return html`<ink-contents .book=${{
    name: 'Book Title',
    id: '/demo',
    attributedTo: [{ name: 'Fancy Author' }],
    resources: [
      { rel: ['cover'], url: 'static/placeholder-cover.png' },
      { rel: ['contents'], url: 'contents.html' }
    ]
  }} current="chap_00012.xhtml"></ink-contents>`
}

export const InkChapter = el => {
  const { book, current } = el
  const api = useContext(ApiContext)
  const [resource, setContent] = useState(
    html`<div class="loading">Loading</div>`
  )
  useEffect(
    () => {
      if (book) {
        el.updateComplete = api.book
          .navigation(book)
          .then(dom => setContent(dom))
          .catch(err => console.error(err))
      }
    },
    [book]
  )
  useEffect(
    () => {
      const { lang } = resource
      if (lang) {
        el.setAttribute('lang', lang)
      }
    },
    [resource]
  )
  useEffect(
    () => {
      const existing = el.querySelector(`[aria-current="page"]`)
      if (existing) {
        existing.removeAttribute('aria-current')
      }
      if (resource && current && el.querySelector(`[href*="${current}"]`)) {
        el
          .querySelector(`[href*="${current}"]`)
          .setAttribute('aria-current', 'page')
      }
    },
    [resource, current]
  )
  return html`${resource.dom}
    `
}
InkChapter.observedAttributes = ['current']

window.customElements.define(
  'ink-contents',
  component(InkChapter, window.HTMLElement, { useShadowDOM: false })
)

import * as textQuote from './selectors/dom-anchor-text-quote.js'
import seek from './selectors/dom-seek.js'
import { html } from 'lit-html'
import { virtual } from 'haunted'
import { api } from '../api-provider.js'
import { opener } from '../utils/create-modal.js'
import './ink-notes-modal.js'

function commentState (note = {}, root) {
  return {
    note,
    deleter (id) {
      if (note.id && root) {
        root
          .querySelectorAll(`reader-highlight[data-note-id="${note.id}"]`)
          .forEach(highlight => highlight.replaceWith(...highlight.childNodes))
        return api.activity.delete({
          type: 'Note',
          noteType: 'reader:Highlight',
          id
        })
      }
    },
    saver (id, content) {
      note.content = content
      return api.activity.update({
        type: 'Note',
        noteType: 'reader:Highlight',
        id,
        content
      })
    }
  }
}

export const HighlightButton = virtual(
  ({ selectionRange, root }, document, bookId) => {
    let selector
    return html`<button style="z-index: 5;" type="button" class="Button" ?hidden=${!(
      selectionRange && root
    )} @click=${() => {
      if (selectionRange && root) {
        selector = textQuote.fromRange(root, selectionRange)
        const html = serializeRange(selectionRange)
        const content = `<blockquote data-original-quote>${html}</blockquote>`
        const docurl = new URL(document, window.location).href
        return api.activity
          .createAndGetID({
            type: 'Note',
            noteType: 'reader:Highlight',
            inReplyTo: docurl,
            'oa:hasSelector': selector,
            content
          })
          .then(id => {
            highlightNote(selector, root, id)
            window
              .getSelection()
              .getRangeAt(0)
              .collapse()
            api
              .get(id)
              .then(note =>
                opener('ink-notes', commentState(note, root), 'Comment')
              )
          })
      }
    }}>Highlight</button>`
  }
)

function highlightNote (selector, root, id) {
  const seeker = document.createNodeIterator(root, window.NodeFilter.SHOW_TEXT)
  function split (where) {
    const count = seek(seeker, where)
    if (count !== where) {
      // Split the text at the offset
      seeker.referenceNode.splitText(where - count)

      // Seek to the exact offset.
      seek(seeker, where - count)
    }
    return seeker.referenceNode
  }
  const positions = textQuote.toTextPosition(root, selector)
  const start = split(positions.start)
  split(positions.end - positions.start)
  var nodes = []
  while (seeker.referenceNode !== start) {
    const node = seeker.previousNode()
    if (node !== start) {
      nodes.push(node)
    }
  }
  for (var i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (
      !node.parentElement.closest('[data-reader]') &&
      !node.parentElement.closest('reader-highlight')
    ) {
      // Create a highlight
      const highlight = document.createElement('reader-highlight')
      highlight.dataset.noteId = id
      highlight.classList.add('Highlight')
      highlight.root = root

      // Wrap it around the text node
      node.parentNode.replaceChild(highlight, node)
      highlight.appendChild(node)
    }
  }
}

export async function highlightNotes (root, notes) {
  for (const note of notes.items) {
    if (note.selector) {
      highlightNote(note.selector, root, note.id)
    }
  }
}

class ReaderHighlight extends window.HTMLElement {
  connectedCallback () {
    this.addEventListener('click', this)
  }
  handleEvent (event) {
    if (
      event.type === 'click' &&
      !this.classList.contains('Highlight--selected')
    ) {
      const customEvent = new window.CustomEvent('reader:highlight-selected', {
        detail: { id: this.dataset.noteId }
      })
      window.dispatchEvent(customEvent)
      api
        .get(this.dataset.noteId)
        .then(note =>
          opener('ink-notes', commentState(note, this.root), 'Comment')
        )
    }
  }
  disconnectedCallback () {
    this.removeEventListener('click', this)
    this.removeEventListener('reader:highlight-selected', this)
  }
}
window.customElements.define('reader-highlight', ReaderHighlight)

function serializeRange (range) {
  const placeholder = document.createElement('div')
  const fragment = range.cloneContents()
  fragment.querySelectorAll('[data-reader]').forEach(element => {
    element.parentElement.removeChild(element)
  })
  fragment.querySelectorAll('reader-highlight').forEach(element => {
    element.replaceWith(element.textContent)
  })
  fragment
    .querySelectorAll('[style]')
    .forEach(element => element.removeAttribute('style'))
  placeholder.appendChild(fragment)
  return placeholder.innerHTML
}

import { Quill } from '/js/vendor/quill.js'
import DOMPurify from 'dompurify'
import { createModal, closer, opener } from '../utils/create-modal.js'
import { html } from 'lit-html'
import { iconButton } from '../widgets/icon-button.js'

const purifyConfig = {
  KEEP_CONTENT: false,
  RETURN_DOM_FRAGMENT: true,
  RETURN_DOM_IMPORT: true,
  FORBID_TAGS: ['style', 'link'],
  FORBID_ATTR: ['style']
}

const renderer = ({ note, saver }, config) => {
  return html`<header class="ModalHeader">
    ${iconButton({
    name: 'cancel',
    click: () => closer(),
    autofocus: true,
    label: 'Close Menu'
  })}
  <h2 class="ModalHeader-title" data-autofocus="true">Comment</h2>
  <span></span>
</header>
<ink-comment class="NotesModal" .note=${note} .saver=${saver}></ink-comment><br>`
}

createModal('ink-notes', renderer, { popper: true })

class InkComment extends window.HTMLElement {
  constructor () {
    super()
    this._note = {}
  }
  set note (annotation) {
    if (annotation && annotation.id !== this._note.id) {
      this._note = annotation
      this.render()
    }
  }
  get note () {
    return this._note || {}
  }
  set saver (saverFunction) {
    this._saver = saverFunction
  }
  get saver () {
    return this._saver || function () {}
  }
  render () {
    let { content } = this.note
    let dom = DOMPurify.sanitize(content, purifyConfig)
    const container = document.createElement('div')
    container.classList.add('ReaderNote-textarea')
    container.classList.add('ql-container')
    container.classList.add('ql-snow')
    container.id = 'test' + '-textarea'
    container.appendChild(dom)
    const oldContainer = this.querySelector('.ql-container')
    if (oldContainer) {
      this.removeChild(oldContainer)
    }
    if (this.querySelector('.ql-toolbar')) {
      this.removeChild(this.querySelector('.ql-toolbar'))
    }
    this.appendChild(container)
    this.setup()
  }
  setup () {
    const container = this.querySelector('.ql-container')
    this.quill = new Quill(container, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline'],
          ['image', 'code-block'],
          ['link', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean']
        ]
      },
      theme: 'snow'
    })
    this.quill.on('selection-change', (range, oldRange, source) => {
      if (range) {
        this.classList.add('InkComment--hasFocus')
      } else {
        this.classList.remove('InkComment--hasFocus')
        const content = this.querySelector('.ql-editor').innerHTML
        this.saver(this.note.id, content)
      }
    })
    this.quill.on('text-change', () => {
      const content = this.querySelector('.ql-editor').innerHTML
      const customEvent = new window.CustomEvent('reader:notes-text-change', {
        detail: { id: this.note.id, content }
      })
      window.dispatchEvent(customEvent)
    })
  }
}
window.customElements.define('ink-comment', InkComment)

export const preview = () => {
  const cache = new Map()
  return html`<button id="test-button" @click=${event =>
    opener(
      'ink-notes',
      {
        note: {
          content: '<p>Test1</p>',
          id: '/note-id1'
        },
        saver (id, content) {
          console.log(id, content)
        }
      },
      'Label This',
      document.getElementById('test-button')
    )}>Button1</button><button  id="test-button2" @click=${event =>
    opener(
      'ink-notes',
      {
        note: {
          content: cache.get('/note-id2') || '<p>Test2</p>',
          id: '/note-id2'
        },
        saver (id, content) {
          cache.set(id, content)
          console.log(id, content)
        }
      },
      'Label This',
      document.getElementById('test-button2')
    )}>Button2</button>`
}

import Quill from '../../js/vendor/quill.js'
import DOMPurify from 'dompurify'
import { createModal, closer, opener } from '../utils/create-modal.js'
import { modalHeader } from '../widgets/modalHeader.js'
import { html } from 'lit-html'
import { iconButton } from '../widgets/icon-button.js'

const purifyConfig = {
  KEEP_CONTENT: false,
  RETURN_DOM_FRAGMENT: true,
  RETURN_DOM_IMPORT: true,
  FORBID_TAGS: ['style', 'link'],
  FORBID_ATTR: ['style']
}

const renderer = ({ note, saver, deleter }, config) => {
  return html`
    <header class="ModalHeader">
      ${
        iconButton({
          name: 'cancel',
          click: () => closer(),
          autofocus: true,
          label: 'Close Menu'
        })
      }
      <h2 class="ModalHeader-title" data-autofocus="true">Comment</h2>
      <span></span>
    </header>
    <ink-comment
      class="NotesModal"
      .note="${note}"
      .saver="${saver}"
      .deleter="${deleter}"
    ></ink-comment>
    <div class="Row">
      <button
        class="TextButton TextButton--warning"
        @click="${
          () => {
            opener(
              'delete-highlight',
              { deleter, id: note.id },
              'Delete Highlight?'
            )
          }
        }"
      >
        Delete Highlight</button
      ><button class="Button" @click="${() => closer()}">Done</button>
    </div>
  `
}

createModal('ink-notes', renderer, {})

const renderConfirm = ({ deleter, id }) => {
  return html`
    ${modalHeader({ title: 'Delete Highlight?' })}
    <confirm-action
      dangerous
      slot="modal-body"
      .action="${
        () => {
          return Promise.resolve()
            .then(() => {
              deleter(id)
            })
            .then(() => {
              closer()
            })
        }
      }"
      name="Delete"
      .view="${
        () =>
          html`
            <p>Are you sure you want to delete this Highlight?</p>
          `
      }"
    ></confirm-action>
  `
}

createModal('delete-highlight', renderConfirm)

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
    const blockquote = dom.querySelector('blockquote')
    if (blockquote) {
      dom.removeChild(blockquote)
    }
    const container = document.createElement('div')
    container.classList.add('ReaderNote-textarea')
    container.classList.add('ql-container')
    container.classList.add('ql-snow')
    container.id = 'test' + '-textarea'
    container.append(dom)
    const oldContainer = this.querySelector('.ql-container')
    if (oldContainer) {
      this.removeChild(oldContainer)
    }
    if (this.querySelector('blockquote')) {
      this.removeChild(this.querySelector('blockquote'))
    }
    if (this.querySelector('.ql-toolbar')) {
      this.removeChild(this.querySelector('.ql-toolbar'))
    }
    this.appendChild(blockquote)
    this.appendChild(container)
    this.setup()
  }
  content () {
    return `<blockquote data-original-quote>${
      this.querySelector('blockquote').innerHTML
    }</blockquote>${this.querySelector('.ql-editor').innerHTML}
    `
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
        this.saver(this.note.id, this.content())
      }
    })
    this.quill.on('text-change', () => {
      const customEvent = new window.CustomEvent('reader:notes-text-change', {
        detail: { id: this.note.id, content: this.content() }
      })
      window.dispatchEvent(customEvent)
    })
  }
}
window.customElements.define('ink-comment', InkComment)

export const preview = () => {
  const cache = new Map()
  return html`
    <button
      id="test-button"
      @click="${
        event =>
          opener(
            'ink-notes',
            {
              note: {
                content:
                  cache.get('/note-id1') ||
                  '<blockquote data-original-quote><p>Original Quote</p></blockquote><p>Test1</p>',
                id: '/note-id1'
              },
              saver (id, content) {
                console.log(id, content)
              },
              deleter (id) {
                console.log(id, 'deleted!')
              }
            },
            'Label This'
          )
      }"
    >
      Button1</button
    ><button
      id="test-button2"
      @click="${
        event =>
          opener(
            'ink-notes',
            {
              note: {
                content:
                  cache.get('/note-id2') ||
                  '<blockquote data-original-quote><p>Original Quote</p><ul><li>This is a list</li><li><a href="http://google.com/">This is a link</a></li></ul></blockquote><p>Test2</p>',
                id: '/note-id2'
              },
              saver (id, content) {
                cache.set(id, content)
                console.log(id, content)
              },
              deleter (id, content) {
                console.log(id, 'deleted!')
              }
            },
            'Label This'
          )
      }"
    >
      Button2
    </button>
  `
}

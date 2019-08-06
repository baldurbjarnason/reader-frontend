import { html } from 'lit-html'
import { component, useState, useEffect } from 'haunted'
import { api } from '../api-provider.js'
import { highlightNotes } from './highlight.js'

export const title = 'readable Chapter display: `<readable-chapter>`'

export const description = `This renders the chapter HTML with only readable CSS.`

// http://localhost:8080/demo/?component=/components/reader/readable-chapter.js
export const preview = path => {
  return html`<readable-chapter chapter=${path ||
    '/demo/chapter/demo.html'}></readable-chapter>`
}

export const readableChapter = el => {
  const { location, chapter, setSelection, setHighlight, book } = el
  const [resource, setChapter] = useState(
    html`<div class="loading">Loading</div>`
  )
  useEffect(
    () => {
      const element = document.getElementById(location)
      if (location && resource && element) {
        window.requestAnimationFrame(() => {
          element.scrollIntoView({ behaviour: 'smooth' })
        })
      }
    },
    [location, resource]
  )
  useEffect(() => {
    function handleSelection () {
      const selection = document.getSelection()
      if (selection.rangeCount !== 0) {
        const range = selection.getRangeAt(0)
        if (range && range.collapsed !== true) {
          setSelection({ selectionRange: range, root: el })
        } else {
          setSelection({})
        }
      }
    }
    document.addEventListener('selectionchange', handleSelection)
    function handleHighlight (event) {
      if (event.type === 'reader:highlight-selected') {
        setHighlight({ noteId: event.detail.id, root: el })
      } else {
        setHighlight({})
      }
    }
    window.addEventListener('reader:highlight-selected', handleHighlight)
    window.addEventListener('reader:highlight-deselected', handleHighlight)
    return () => {
      document.removeEventListener('selectionchange', handleSelection)
      window.removeEventListener('reader:highlight-selected', handleHighlight)
      window.removeEventListener('reader:highlight-deselected', handleHighlight)
    }
  }, [])
  useEffect(
    () => {
      if (chapter) {
        el.classList.add('is-loading')
        Promise.resolve()
          .then(() => {
            if (resource.nextDom) {
              return Promise.resolve(resource.nextDom)
            } else {
              return api.book.chapter(chapter, false, book)
            }
          })
          .then(dom => {
            el.classList.remove('is-loading')
            window.scrollTo(0, 0)
            setChapter(dom)
            return dom
          })
          .then(dom => {
            const { next } = dom
            if (next) {
              return api.book.chapter(next, false, book).then(nextDom => {
                dom.nextDom = nextDom
                setChapter(dom)
              })
            }
          })
          .catch(err => console.error(err))
      }
    },
    [chapter, book]
  )
  useEffect(
    () => {
      const { lang, notes } = resource
      if (lang) {
        el.setAttribute('lang', lang)
      }
      if (resource) {
        followLocations(el)
      }
      if (notes && resource) {
        window.requestAnimationFrame(() => highlightNotes(el, notes))
      }
    },
    [resource]
  )
  return html`<div class="readable-chapter-body">${resource.dom}</div>`
}
readableChapter.observedAttributes = ['chapter', 'location', 'readable']

window.customElements.define(
  'readable-chapter',
  component(readableChapter, window.HTMLElement, { useShadowDOM: false })
)

const positionObserver = new window.IntersectionObserver(onPosition, {
  rootMargin: '0px 0px -75% 0px'
})

let highest
let visible = []
function onPosition (entries) {
  const enteringView = entries
    .filter(entry => entry.isIntersecting)
    .map(entry => entry.target)
  const leavingView = entries
    .filter(entry => !entry.isIntersecting)
    .map(entry => entry.target)
  visible = visible.filter(entry => !leavingView.includes(entry))
  visible = visible.concat(enteringView)
  if (visible[1]) {
    highest = visible[1]
  } else {
    highest = visible[0]
  }
  let root
  if (highest) {
    root = highest.closest('readable-chapter')
    root
      .querySelectorAll('.is-current')
      .forEach(element => element.classList.remove('is-current'))
    highest.classList.add('is-current')
    root.setAttribute('current', highest.id)
  }
}

function followLocations (el) {
  window.requestAnimationFrame(() => {
    el.querySelectorAll('[id]').forEach(element => {
      positionObserver.observe(element)
    })
  })
}

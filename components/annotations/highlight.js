const wickedElements = require('wicked-elements').default
const seek = require('dom-seek')
let rangeId = 0

wickedElements.define('reader-highlight', {
  onconnected (event) {
    this.element = event.currentTarget
    this.el.addEventListener('click', this)
  },
  onclick (event) {
    const rangeId = this.element.dataset.rangeId
    const selected = this.element.classList.contains('Highlight--selected')
    if (rangeId && !selected) {
      document
        .querySelectorAll(`[data-range-id="${rangeId}"]`)
        .forEach(element => element.classList.add('Highlight--selected'))
      document.body.dispatchEvent(
        new window.CustomEvent('reader:highlight-selected', {
          detail: { rangeId }
        })
      )
    } else if (selected) {
      document
        .querySelectorAll(`[data-range-id="${rangeId}"]`)
        .forEach(element => element.classList.remove('Highlight--selected'))
      document.body.dispatchEvent(
        new window.CustomEvent('reader:highlight-deselected', {
          detail: { rangeId }
        })
      )
    }
  }
})

wickedElements.define('[is="remove-highlight-button"]', {
  onconnected (event) {
    this.element = event.currentTarget
    this.element.addEventListener('click', this)
    document.body.addEventListener('reader:highlight-selected', this)
    document.body.addEventListener('reader:highlight-deselected', this)
    this.element.disabled = true
  },
  onclick (event) {
    document
      .querySelectorAll(
        `reader-highlight[data-range-id="${this.element.dataset.rangeId}"]`
      )
      .forEach(element => {
        const range = document.createRange()
        range.setStartBefore(element.firstChild)
        range.setEndAfter(element.lastChild)
        const fragment = range.extractContents()
        element.parentElement.replaceChild(fragment, element)
      })
  },
  'onreader:highlight-selected': function (event) {
    console.log(event)
    this.element.disabled = false
    this.element.dataset.rangeId = event.detail.rangeId
  },
  'onreader:highlight-deselected': function (event) {
    console.log(event)
    this.element.disabled = true
    this.element.dataset.rangeId = null
  }
})

wickedElements.define('[is="highlight-button"]', {
  onconnected (event) {
    this.el = event.currentTarget
    this.el.addEventListener('click', this)
  },
  onclick (event) {
    const selection = window.getSelection()
    if (selection.isCollapsed) return null
    let range
    if (selection.rangeCount > 1) {
      const endRange = selection.getRangeAt(selection.rangeCount - 1)
      range = selection.getRangeAt(0)
      range.setEnd(endRange.endContainer, endRange.endOffset)
    } else {
      range = selection.getRangeAt(0)
    }
    const texts = getTexts(range)
    texts.forEach(rangeString => highlightString(rangeString, rangeId))
    rangeId = rangeId + 1
    console.log(texts)
    selection.collapseToStart()
  }
})

function getTexts (range) {
  const end = range.endContainer
  const start = range.startContainer
  const iterator = document.createNodeIterator(
    document.getElementById('chapter'),
    window.NodeFilter.SHOW_ALL
  )
  while (iterator.referenceNode !== start) {
    iterator.nextNode()
  }
  const ranges = []
  let newRange = document.createRange()
  newRange.setStart(range.startContainer, range.startOffset)
  while (iterator.referenceNode !== end) {
    const ref = iterator.referenceNode
    if (newRange && ref.matches && ref.matches('[data-reader]')) {
      newRange.setEndBefore(ref)
      ranges.push(newRange)
      newRange = undefined
      iterator.nextNode()
    } else if (ref.parentElement.closest('[data-reader]')) {
      iterator.nextNode()
    } else if (!newRange) {
      newRange = document.createRange()
      newRange.setStartBefore(ref)
      iterator.nextNode()
    } else {
      iterator.nextNode()
    }
  }
  if (newRange) {
    newRange.setEnd(end, range.endOffset)
    ranges.push(newRange)
  }
  const texts = ranges.map(range => range.toString())
  return texts
}

function highlightString (text, rangeId) {
  const offset = document.body.textContent.indexOf(text)
  const length = text.length
  const iterator = document.createNodeIterator(
    document.body,
    window.NodeFilter.SHOW_TEXT
  )
  function split (where) {
    const count = seek(iterator, where)
    if (count !== where) {
      // Split the text at the offset
      iterator.referenceNode.splitText(where - count)

      // Seek to the exact offset.
      seek(iterator, where - count)
    }
    return iterator.referenceNode
  }
  split(offset)
  const end = split(length)
  const nodeCollector = document.createNodeIterator(
    document.body,
    window.NodeFilter.SHOW_TEXT
  )
  seek(nodeCollector, offset)
  var nodes = []
  while (nodeCollector.referenceNode !== end) {
    nodes.push(nodeCollector.nextNode())
  }
  // nodes = nodes.filter((node) => !node.parentElement.matches('[data-reader]'))
  for (var i = 0; i < nodes.length; i++) {
    const node = nodes[i]
    if (!node.parentElement.closest('[data-reader]')) {
      // Create a highlight
      const highlight = document.createElement('reader-highlight')
      highlight.dataset.reader = true
      highlight.dataset.rangeId = rangeId
      highlight.classList.add('Highlight')

      // Wrap it around the text node
      node.parentNode.replaceChild(highlight, node)
      highlight.appendChild(node)
    }
  }
}

window.highlightString = highlightString
// Get range
// Split text node at end and start.
// Iterate to start
// iterate through range, building fresh sub ranges that don't include ui elements
// Turn arrays of ranges into flat array of strings.
// Call highlightString on each string in array.
// Highlight string root should be main/chapter
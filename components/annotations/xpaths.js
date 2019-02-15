const wickedElements = require('wicked-elements').default
const { html } = require('lighterhtml')
const xpathObserver = new window.IntersectionObserver(onIntersection, {
  rootMargin: '50px 0px'
})
const positionObserver = new window.IntersectionObserver(onPosition, {
  threshold: 1,
  rootMargin: '0px 0px -50% 0px'
})

let highest
function onPosition (entries) {
  const nextHighest = entries.reduce((prev, current) => {
    if (
      current.intersectionRatio > prev.intersectionRatio &&
      current.intersectionRatio === 1
    ) {
      return current
    } else {
      return prev
    }
  })
  if (!highest) {
    highest = nextHighest
  } else if (nextHighest.intersectionRatio >= highest.intersectionRatio) {
    highest = nextHighest
  }
  document.getElementById('chapter').dataset.currentPosition =
    highest.target.dataset.xpath
}

function onIntersection (entries) {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0) {
      xpathObserver.unobserve(entry.target)
      addAnnotationTools(entry.target)
    }
  })
}

function addAnnotationTools (element) {
  const xpath = element.dataset.xpath
  // const formId = 'marker-' + xpath
  // const checkId = 'marker-check-' + xpath
  if (!element.querySelector('.NoteButton')) {
    const button = html`<button class="NoteButton" is="note-button" aria-label="Add note" data-for="${xpath}"><svg viewBox="0 0 10 10" fill="currentColor" stroke="transparent" width="15" height="15">
    <path d="m1 4h8v2h-8zm3-3h2v8h-2z"></path>
  </svg></button>`
    element.appendChild(button)
  }
  if (!element.querySelector('.Marker')) {
    const marker = html`<div class="Marker"><button class="NoteButton NoteButton--marker" is="marker-button" aria-label="Add marker" data-for="${xpath}"><svg viewBox="0 0 10 10" fill="currentColor" stroke="transparent" width="15" height="15">
    <path d="m1 4h8v2h-8zm3-3h2v8h-2z"></path>
  </svg></button></div>`
    element.appendChild(marker)
  }
}

wickedElements.define('[data-xpath]', {
  init: function (event) {
    xpathObserver.observe(event.currentTarget)
    positionObserver.observe(event.currentTarget)
  },
  onconnected (event) {
    // // add position attributes to marker
  },
  ondisconnected (event) {
    // remove drop down marker element from sidebar
  }
})

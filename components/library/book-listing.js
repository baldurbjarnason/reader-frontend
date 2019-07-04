import { html } from 'lit-html'
import { component } from 'haunted'

export const title = 'Book Listing Component: `<book-listing>`'

export const description = `This is a book listing component used in the library and collection views.`

export const preview = () => {
  return html`<book-listing .book=${{
    name: 'Book Title',
    id: 'https://example.com/id',
    attributedTo: [{ name: 'Fancy Author' }],
    resources: [{ rel: ['cover'], url: '/static/placeholder-cover.png' }]
  }}></book-listing>`
}

export const BookListing = ({ book = {}, layout }) => {
  let { resources = [], author = [] } = book
  if (resources.data) {
    resources = resources.data
  }
  const coverResource = resources.filter(resource =>
    resource.rel.includes('cover')
  )[0]
  let cover
  if (coverResource) {
    const url = new URL(book.id, window.location).pathname
    cover = `${url}${coverResource.url}?cover=true`
  } else {
    cover = '/static/placeholder-cover.jpg'
  }
  let url
  if (book.id) {
    const pathname = new URL(book.id).pathname
    url = `/info${pathname}`
  }
  return html`
    <div class=${layout}><a href="${url}" class="icon-link">
    <img class="BookCard-icon" alt="${book.description ||
      ''}" src="${cover}"></a>
    <div class="BookCard-group">
      <h4 class="BookCard-title"><a href="${url}" class="BookCard-link">${
  book.name
}</a></h4>
      <p class="BookCard-paragraph">${author.map(attributionComponent)}</p>
      <p class="BookCard-total"></p>
    </div></div>
    `
}
BookListing.observedAttributes = ['layout']

const attributionComponent = attribution => {
  return html`<span class="BookCard-attribution">${attribution.name}</span>`
}

window.customElements.define(
  'book-listing',
  component(BookListing, window.HTMLElement, {
    useShadowDOM: false
  })
)

/* global it, describe */
import { html, fixture, expect, nextFrame } from '@open-wc/testing'

import { preview as previewChapter } from '../components/reader/readable-chapter.js'
import { preview as previewBookList } from '../components/library/book-list.js'
import { preview as previewCollection } from '../components/library/collection.js'
import { preview as previewUploader } from '../components/library/uploader.js'
import { preview as previewButton } from '../components/widgets/button.js'
import { preview as previewDropdown } from '../components/widgets/dropdown.js'
import { preview as previewContents } from '../components/reader/ink-contents.js'
import { names } from '../components/widgets/icon-button.js'
import { preview as previewConfirm } from '../components/modals/confirm-action.js'

describe('<readable-chapter>', () => {
  it('readable-chapter basic render', async () => {
    const el = await fixture(previewChapter('/base/demo/chapter/demo.html'))
    await el.updateComplete
    await nextFrame()
    expect(el).dom.to.equalSnapshot()
  })
})

describe('<book-list>', () => {
  it('book-list basic render', async () => {
    const el = await fixture(previewBookList())
    expect(el).dom.to.equalSnapshot()
  })
})

describe('<ink-collection>', () => {
  it('ink-collection basic render', async () => {
    const el = await fixture(previewCollection())
    expect(el).dom.to.equalSnapshot()
  })
})

describe('<ink-uploader>', () => {
  it('ink-uploader basic render', async () => {
    const el = await fixture(previewUploader())
    expect(el).dom.to.equalSnapshot()
  })
})
describe('<ink-button>', () => {
  it('ink-button basic render', async () => {
    const el = await fixture(previewButton())
    expect(el).dom.to.equalSnapshot()
  })
})
describe('<ink-dropdown>', () => {
  it('ink-dropdown basic render', async () => {
    const el = await fixture(previewDropdown())
    expect(el).dom.to.equalSnapshot()
    expect(el).shadowDom.to.equalSnapshot()
  })
})
describe('<ink-contents>', () => {
  it('ink-contents basic render', async () => {
    const el = await fixture(
      previewContents({
        name: 'Book Title',
        id: '/demo',
        attributedTo: [{ name: 'Fancy Author' }],
        resources: [
          { rel: ['cover'], url: '/base/demo/static/placeholder-cover.png' },
          { rel: ['contents'], url: '/base/demo/contents.html' }
        ]
      })
    )
    await el.updateComplete
    await nextFrame()
    expect(el).dom.to.equalSnapshot()
  })
})
describe('<icon-button>', () => {
  it('icon-button basic render', async () => {
    for (const name of names) {
      const el = await fixture(
        html`<icon-button selected name="${name}">Icon Label - Selected</icon-button>`
      )
      expect(el).dom.to.equalSnapshot()
      const el2 = await fixture(
        html`<icon-button name="${name}">Icon Label - Not Selected</icon-button>`
      )
      expect(el2).dom.to.equalSnapshot()
    }
  })
})

describe('<confirm-action>', () => {
  it('confirm-action basic render', async () => {
    const el = await fixture(previewConfirm())
    expect(el).dom.to.equalSnapshot()
  })
})

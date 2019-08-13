import { storiesOf } from '@storybook/svelte'
import { action } from '@storybook/addon-actions'

import Book from './Book.svelte'
import AnnotationsPage from './AnnotationsPage.svelte'

storiesOf('Book', module)
  .add('with text', () => ({
    Component: Book,
    props: { text: 'Book First pass' }
  }))
storiesOf('Annotations Page', module)
  .add('with text', () => ({
    Component: AnnotationsPage
  }))

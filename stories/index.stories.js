import { storiesOf } from '@storybook/svelte'
import { action } from '@storybook/addon-actions'

import Button from './button.svelte'
import AnnotationsPage from './AnnotationsPage.svelte'

storiesOf('Button', module)
  .add('with text', () => ({
    Component: Button,
    props: { text: 'Hello Button With Loads of Text' },
    on: { click: action('clicked') }
  }))
  .add('with some emoji', () => ({
    Component: Button,
    props: {
      text: '😀 😎 👍 💯'
    },
    on: { click: action('clicked') }
  }))
storiesOf('Annotations Page', module)
  .add('with text', () => ({
    Component: AnnotationsPage
  }))

<script>
  import AnnotationsPage from '../components/annotations/AnnotationsPage.svelte'
import { setContext } from 'svelte'
import {api} from '../js/components/api-provider.component.dev.js'
api.book.notes = (url) => {
  let count = 0
  return {
    summary: url,
    items: [{
      type: 'Note',
      id: count++,
      noteType: 'reader:Highlight',
      'oa:hasSelector': {},
      content: '<blockquote data-original-quote><p>Original Quote</p><ul><li>This is a list</li><li><a href="http://google.com/">This is a link</a></li></ul></blockquote><p>Test1</p>'
    }, {
      type: 'Note',
      id: count++,
      noteType: 'reader:Highlight',
      'oa:hasSelector': {},
      content: '<blockquote data-original-quote><p>Original Quote</p><ul><li>This is a list</li><li><a href="http://google.com/">This is a link</a></li></ul></blockquote>'
    }, {
      type: 'Note',
      id: count++,
      noteType: 'reader:Highlight',
      'oa:hasSelector': {},
      content: '<blockquote data-original-quote><p>Original Quote</p><ul><li>This is a list</li><li><a href="http://google.com/">This is a link</a></li></ul></blockquote><p>Test3</p>'
    }]
  }
}
setContext('ink-api', api)
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<AnnotationsPage bookId="/stories/preview-data/book.json" />
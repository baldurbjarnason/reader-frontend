<script>
  // your script goes here
  import Book from '../components/book/Book.svelte'
  import { setContext } from 'svelte'
  import {api} from '../js/components/api-provider.component.dev.js'
  setContext('ink-api', api)
  const bookId = 'stories/preview-data/bookdemo/index.json'
  const bookPath = 'demo.xhtml'
</script>

<style>
  /* your styles go here */
</style>

<!-- markup (zero or more items) goes here -->
<Book bookId={bookId} bookPath={bookPath} />
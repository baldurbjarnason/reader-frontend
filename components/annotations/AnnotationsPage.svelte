<script>
// Annotations components include: Highlight, Bookmark
// Later on: Assessment, Link, Bookmark
  import { onMount, getContext } from 'svelte'
  import Book from './Book.svelte'
  import AnnotationsChapter from './AnnotationsChapter.svelte'
  import AnnotationsToolbar from './AnnotationsToolbar.svelte'
  export let bookId
  export let annotations = []
  let api = getContext('ink-api')
  let book
  onMount(async () => {
    book = await api.book.get(bookId)
    for (const chapter of book.readingOrder) {
      const {url} = chapter
      let notes = await api.book.notes(url)
      annotations = annotations.concat(notes)
    }
  })
  console.log(annotations)
</script>

<style>
  .AnnotationsPage {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
</style>

<!-- markup (zero or more items) goes here -->
<AnnotationsToolbar return="#" title="Annotations &amp; Notes" />
<div class="AnnotationsPage">
  <Book book={book}/>
  {#each annotations as annotation, i}
    <AnnotationsChapter annotations={annotation} index={i} />
  {/each}
</div>
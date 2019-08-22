<script>
// Annotations components include: Highlight, Bookmark
// Later on: Assessment, Link, Bookmark
  import { onMount, getContext } from 'svelte'
  import Book from './Book.svelte'
  import AnnotationsChapter from './AnnotationsChapter.svelte'
  import Toolbar from '../toolbars/Toolbar.svelte'
  import { fade } from 'svelte/transition'
  export let bookId
  let annotations = []
  let api = getContext('ink-api')
  let book
  $: loadBook(bookId)
  async function loadBook (bookId) {
    book = await api.book.get(bookId)
    for (const chapter of book.readingOrder) {
      const {url} = chapter
      const bookURL = new URL(book.id, window.location)
      const notesUrl = new URL(url, bookURL).href
      let notes = await api.book.notes(notesUrl)
      annotations = annotations.concat(notes)
    }
  }
</script>

<style>
  .AnnotationsPage {
    padding: 0;
    display: flex;
    flex-direction: column;
  }
</style>

<!-- markup (zero or more items) goes here -->
<Toolbar returnPath={'/info' + bookId} title="Annotations &amp; Notes"><div class="AnnotationsToolbar-title">Annotations &amp; Notes</div></Toolbar>
{#if book && annotations.length !== 0}
<div class="AnnotationsPage" transition:fade>
  <Book book={book}/>
  {#each annotations as annotation, i}
    <AnnotationsChapter annotations={annotation} index={i} />
  {/each}
</div>
{/if}
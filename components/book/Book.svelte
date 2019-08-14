<script>
  import Toolbar from '../toolbars/Toolbar.svelte'
  import NavBar from '../toolbars/NavBar.svelte'
  import Chapter from './Chapter.svelte'
  import Progress from './Progress.svelte'
  import ContentsButton from './ContentsButton.svelte'
  import { getContext, setContext } from 'svelte'
  import {getNavigation} from './getNavigation.js'
  export let bookId
  export let bookPath
  let api = getContext('ink-api')
  let book
  if (bookId) {
    book = api.book
      .get(`/${bookId}`)
  }
  let navigationPromise
  if (book && bookPath) {
    navigationPromise = getNavigation(bookPath, book)
  }
  let currentLocation
  function handleCurrent ({detail}) {
    currentLocation = detail.highest.dataset.location
  }
  let loadedLocations = []
  function handleAppearing ({detail}) {
    loadedLocations = loadedLocations.concat(detail.nodes)
  }
  // your script goes here
</script>

<style>
.BookBody {
  min-height: 100vh;
  background-color: white;
}
</style>

<!-- markup (zero or more items) goes here -->
<Toolbar returnPath={'/info' + bookId}>
  <div slot="left-button"><ContentsButton /></div>
{#if book}
  {#await book}
    <!-- promise is pending -->
    <div class="BookToolbar-title">Loading...</div>
  {:then bookObject}
    <!-- promise was fulfilled -->
    <div class="BookToolbar-title">{bookObject.name}</div>
  {:catch error}
    <!-- promise was rejected -->
    <div class="BookToolbar-title">Loading failed!</div>
  {/await} 
{/if} 
</Toolbar>
{#if book}
  {#await book}
    <!-- promise is pending -->
    <div class="BookBody BookBody--loading Loading">Loading...</div>
  {:then bookObject}
    <!-- promise was fulfilled -->
    <div class="BookBody">
    {#each bookObject.readingOrder as chapter, index}
       <!-- content here -->
       <Chapter chapter={chapter} book={bookObject} current={bookPath} index={index} on:current={handleCurrent} on:appearing={handleAppearing} />
    {/each}
    </div>
  {#if navigationPromise}
    {#await navigationPromise}
      <!-- promise is pending -->
      <NavBar />
    {:then navigation}
      <NavBar navigation={navigation}>
        <Progress chapters={bookObject.readingOrder} current={bookPath} />
      </NavBar>
    {/await} 
  {/if} 
  {:catch error}
    <!-- promise was rejected -->
    <div class="BookBody BookBody--failed">Loading failed!</div>
  {/await} 
{/if} 


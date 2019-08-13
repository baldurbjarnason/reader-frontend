<script>
	import { fade, fly } from 'svelte/transition'
  import {getChapter} from './getChapter.js'
  export let chapter
  export let book
  export let current
  export let index
  const {url} = chapter
  const bookURL = new URL(book.id, window.location)
  const chapterHref = new URL(url, bookURL).href
  let htmlPromise
  let visible
  if ((current === url) || (index=== 0 && !current)) {
    htmlPromise = getChapter(chapterHref, index)
    visible = true
  } else {
    visible = false
  }
  // your script goes here
</script>

<style>
.Chapter {
  all: initial;
  position: relative;
  line-height: var(--reader-line-height);
  font-size: var(--reader-font-size);
  color: var(--reader-text-color);
  font-family: 'Source Serif Pro', serif;
  background-color: var(--reader-background-color);
  line-height: var(--reader-line-height);
  display: block;
  contain: content;
  padding: 0;
  display: grid;
  grid-template-columns:
    minmax(var(--reader-left-margin), 0.25fr) minmax(
      var(--reader-min-column-width),
      var(--reader-max-column-width)
    )
    minmax(var(--reader-left-margin), 1fr);
  grid-template-areas: 'leftmargin maintext rightmargin';
}
.ChapterBody {
  grid-area: maintext;
  min-width: var(--reader-min-column-width);
  max-width: var(--reader-max-column-width);
  margin: 0;
}
.ChapterNotes {
  grid-area: rightmargin;
  margin-left: var(--reader-left-margin);
  background-color: #fefefe;
}
:global(.Chapter > *) {
  grid-area: maintext;
}
.Chapter.Loading {
  opacity: 0.5;
}
.ChapterBody :global(.Highlight) {
  background-color: #ffff98;
}

.ChapterBody :global(.Highlight--selected) {
  background-color: #ddddd0;
}

.ChapterBody :global([hidden]),
.ChapterBody :global(template) {
  display: none !important;
}
.ChapterBody :global(head) {
  display: none;
}

.ChapterBody :global(blockquote) {
  margin-left: 2.5em;
}

.ChapterBody :global(blockquote),
.ChapterBody :global(blockquote p) {
  font-size: 0.75rem;
  font-size: calc(var(--reader-font-size) * 0.85);
  line-height: 1.2;
}

.ChapterBody :global(blockquote * + *) {
  margin-top: calc(var(--reader-paragraph-spacing) * 0.85);
}
.ChapterBody :global(blockquote *) {
  margin-bottom: 0;
}
.ChapterBody :global(blockquote :first-child) {
  margin: 0;
}
.ChapterBody :global(h1) {
  font-size: 2em;
  font-size: calc(var(--reader-font-size) * 3);
  font-weight: 600;
  margin: 0;
}

.ChapterBody :global(h2) {
  font-weight: 600;
  font-size: calc(var(--reader-font-size) * 2);
  margin: 0;
}
.ChapterBody :global(h3) {
  font-weight: 400;
  font-style: italic;
  font-size: calc(var(--reader-font-size) * 1.5);
  margin: 0;
}
.ChapterBody :global(h4) {
  font-weight: normal;
  font-size: calc(var(--reader-font-size) * 1.25);
  margin: 0;
}
.ChapterBody :global(h5) {
  font-weight: normal;
  font-size: var(--reader-font-size);
  text-transform: uppercase;
  margin: 0;
}

.ChapterBody :global(h6) {
  font-weight: normal;
  font-size: var(--reader-font-size);
  margin: 0;
}

.ChapterBody :global(h1),
.ChapterBody :global(h2),
.ChapterBody :global(h3),
.ChapterBody :global(h4),
.ChapterBody :global(h5),
.ChapterBody :global(h6) {
  margin-bottom: var(--reader-paragraph-spacing);
}

.ChapterBody :global(p),
.ChapterBody :global(div),
.ChapterBody :global(td),
.ChapterBody :global(figure),
.ChapterBody :global(figcaption) {
  line-height: var(--reader-line-height);
  font-size: 0.85rem;
  font-size: var(--reader-font-size, 0.85rem);
}

.ChapterBody :global(a[href]) {
  transition: box-shadow 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22),
    transform 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22);
  text-decoration: underline;
}
.ChapterBody :global(:link) {
  color: var(--link);
}
.ChapterBody :global(:visited) {
  color: var(--visited);
}
.ChapterBody :global(a:link:hover) {
  color: var(--hover);
}
.ChapterBody :global(a) {
  border-radius: 2rem;
}
@keyframes readableChapterPop {
  0% {
    box-shadow: 0 0 0 1px rgb(228, 255, 254, 0.2);
    background-color: rgb(228, 255, 254, 0.2);
    transform: scale(0.5);
  }
  50% {
    box-shadow: 0 0 0 8px var(--rc-lighter);
    transform: scale(1.5);
  }
  100% {
    box-shadow: 0 0 0 3px var(--rc-lighter);
    background-color: var(--rc-lighter);
    transform: scale(1);
  }
}
.ChapterBody :global(a:focus) {
  background-color: var(--rc-lighter);
  box-shadow: 0 0 0 5px var(--rc-lighter);
  outline: solid transparent;
  animation: readableChapterPop 0.25s ease-in-out;
}

.ChapterBody :global(a:link:active) {
  color: var(--active);
}
.ChapterBody :global(b),
.ChapterBody :global(strong),
.ChapterBody :global(b > *),
.ChapterBody :global(strong > *) {
  font-weight: 600;
}
.ChapterBody :global(svg),
.ChapterBody :global(img) {
  max-height: 88vh;
  width: auto;
  height: auto;
  max-width: 100%;
}
.ChapterBody :global(.is-current) {
  background-color: #f9f9f9;
  box-shadow: 0 0 0 0.25rem #f9f9f9;
}
</style>

{#if visible}
  {#await htmlPromise}
      <div class="Chapter Chapter--loading Loading" transition:fade>Loading...</div>
    <!-- promise is pending -->
  {:then html}
    <!-- The direction of the fly transition should depend on navigation order -->
    <div class="Chapter" in:fly="{{ x: 0, y: 200, duration: 250 }}" out:fly="{{ x: 0, y: -200, duration: 250 }}"><div class="ChapterBody">{@html html }</div>
    <div class="ChapterNotes"></div></div>
  {:catch error}
    <div class="Chapter Chapter-error" transition:fade>
    <p>An error occured:</p>
    <pre><code>{JSON.stringify(error, null, 2)}</code></pre></div>
    <!-- promise was rejected -->
  {/await}
{/if}
<script>
  import {onMount, onDestroy, createEventDispatcher} from 'svelte'
	import { fade, fly } from 'svelte/transition'
  import {getChapter} from './getChapter.js'
  import ChapterBody from './ChapterBody.svelte'
  const dispatch = createEventDispatcher()
  export let chapter
  export let book
  export let current
  export let index
  let {url} = chapter
  let bookURL = new URL(book.id, window.location)
  let chapterHref = new URL(chapter.url, bookURL).href
  let htmlPromise
  let visible
  if ((current === url) || (index=== 0 && !current)) {
    htmlPromise = getChapter(chapterHref, index)
    visible = true
  } else {
    visible = false
  }
  let positionObserver
  let locationObserver
  let highest
  let chapterElement
  onMount(() => {
    if (!positionObserver) {
      positionObserver = new window.IntersectionObserver(onPosition, {
        rootMargin: '-15% 0px -75% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      })
    }
    if (!locationObserver) {
      locationObserver = new window.IntersectionObserver(onLocation, {
        rootMargin: '15% 0px 75% 0px',
        threshold: [0]
      })
    }
    function onPosition (entries) {
      if (entries[0].target !== highest) {
        highest = entries[0].target
        dispatch('current', {
          highest
        })
      }
    }
    function onLocation (entries) {
      const nodes = entries.map(entry => {
        locationObserver.unobserve(entry.target)
        const {target, boundingClientRect} = entry
        const {top, left, width, height} = boundingClientRect
        return {target, top, width, height, location: target.dataset.location}
        })
      dispatch('appearing', {
        nodes
      })
    }
  })
  onDestroy(() => {
    positionObserver.disconnect()
    locationObserver.disconnect()
  })
  function handleIntroEnd () {
    window.requestAnimationFrame(() => {
      chapterElement.querySelectorAll('[data-location]').forEach(element => {
        positionObserver.observe(element)
        locationObserver.observe(element)
      })
    })
  }
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
    minmax(var(--reader-left-margin), 0.25fr) minmax( var(--reader-min-column-width), var(--reader-max-column-width) ) minmax(calc(2 * var(--reader-left-margin)), 1fr);
  grid-template-areas: 'leftmargin maintext rightmargin';
  grid-row-gap: var(--reader-paragraph-spacing);
}
.ChapterNotes {
  grid-area: rightmargin;
  margin-left: var(--reader-left-margin);
  background-color: #fefefe;
}
:global(.Chapter > *) {
  grid-column: 2 / 3;
}
.Chapter.Loading {
  opacity: 0.5;
}

.Chapter :global(.Highlight) {
  background-color: #ffff98;
}

.Chapter :global(.Highlight--selected) {
  background-color: #ddddd0;
}

.Chapter :global([hidden]),
.Chapter :global(template) {
  display: none !important;
}
.Chapter :global(head) {
  display: none;
}

.Chapter :global(blockquote) {
  margin-left: 2.5em;
}

.Chapter :global(blockquote),
.Chapter :global(blockquote p) {
  font-size: 0.75rem;
  font-size: calc(var(--reader-font-size) * 0.85);
  line-height: 1.2;
}

.Chapter :global(blockquote * + *) {
  margin-top: calc(var(--reader-paragraph-spacing) * 0.85);
}
.Chapter :global(blockquote *) {
  margin-bottom: 0;
}
.Chapter :global(blockquote :first-child) {
  margin: 0;
}
.Chapter :global(h1) {
  font-size: 2em;
  font-size: calc(var(--reader-font-size) * 3);
  font-weight: 600;
  margin: 0;
}

.Chapter :global(h2) {
  font-weight: 600;
  font-size: calc(var(--reader-font-size) * 2);
  margin: 0;
}
.Chapter :global(h3) {
  font-weight: 400;
  font-style: italic;
  font-size: calc(var(--reader-font-size) * 1.5);
  margin: 0;
}
.Chapter :global(h4) {
  font-weight: normal;
  font-size: calc(var(--reader-font-size) * 1.25);
  margin: 0;
}
.Chapter :global(h5) {
  font-weight: normal;
  font-size: var(--reader-font-size);
  text-transform: uppercase;
  margin: 0;
}

.Chapter :global(h6) {
  font-weight: normal;
  font-size: var(--reader-font-size);
  margin: 0;
}

.Chapter :global(h1),
.Chapter :global(h2),
.Chapter :global(h3),
.Chapter :global(h4),
.Chapter :global(h5),
.Chapter :global(h6) {
  margin: 0;
}

.Chapter :global(p),
.Chapter :global(td),
.Chapter :global(figure),
.Chapter :global(figcaption) {
  line-height: var(--reader-line-height);
  font-size: 0.85rem;
  font-size: var(--reader-font-size, 0.85rem);
}

.Chapter :global(a[href]) {
  transition: box-shadow 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22),
    transform 0.1s cubic-bezier(0.9, 0.03, 0.69, 0.22);
  text-decoration: underline;
}
.Chapter :global(:link) {
  color: var(--link);
}
.Chapter :global(:visited) {
  color: var(--visited);
}
.Chapter :global(a:link:hover) {
  color: var(--hover);
}
.Chapter :global(a) {
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
.Chapter :global(a:focus) {
  background-color: var(--rc-lighter);
  box-shadow: 0 0 0 5px var(--rc-lighter);
  outline: solid transparent;
  animation: readableChapterPop 0.25s ease-in-out;
}

.Chapter :global(a:link:active) {
  color: var(--active);
}
.Chapter :global(b),
.Chapter :global(strong),
.Chapter :global(b > *),
.Chapter :global(strong > *) {
  font-weight: 600;
}
.Chapter :global(svg),
.Chapter :global(img) {
  max-height: 88vh;
  width: auto;
  height: auto;
  max-width: 100%;
}
.Chapter :global(.is-current) {
  background-color: #f9f9f9;
  box-shadow: 0 0 0 0.25rem #f9f9f9;
}
:global(article, blockquote, details, dl, figcaption, figure, hr, ol, p, section, table, ul) {
  margin: 0;
}
</style>

{#if visible}
  {#await htmlPromise}
      <div class="Chapter Chapter--loading Loading" transition:fade>Loading...</div>
    <!-- promise is pending -->
  {:then html}
    <!-- The direction of the fly transition should depend on navigation order -->
    <div class="Chapter" in:fly="{{ x: 0, y: 200, duration: 250 }}" out:fly="{{ x: 0, y: -200, duration: 250 }}" bind:this={chapterElement} on:introend={handleIntroEnd}>
    <ChapterBody html={html} />
    <div class="ChapterNotes"></div></div>
  {:catch error}
    <div class="Chapter Chapter-error" transition:fade>
    <p>An error occured:</p>
    <pre><code>{JSON.stringify(error, null, 2)}</code></pre></div>
    <!-- promise was rejected -->
  {/await}
{/if}
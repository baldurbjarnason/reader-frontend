<script>
  // your script goes here
  export let tag
  export let index
</script>

<style>
  /* your styles go here */
  .TagNotes {
    grid-column: 3 / -1;
    font-family: var(--fonts);
    font-size: 0.55rem;
    text-transform: uppercase;
    color: #777;
    text-align: left;
    padding: 0.25rem 0.5rem 0;
  }
  .Location {
    background-color: #fdfdfd;
    box-shadow: 0 0 0 4px #fdfdfd;
  }
</style>

<!-- markup (zero or more items) goes here -->
{#if tag.tagName === 'p'}
<p {...tag.attributes}>{@html tag.html}</p>
{:else if  tag.tagName === 'h1'}
<h1 {...tag.attributes}>{@html tag.html}</h1>
{:else if  tag.tagName === 'h2'}
<h2 {...tag.attributes}>{@html tag.html}</h2>
{:else if  tag.tagName === 'h3'}
<h3 {...tag.attributes}>{@html tag.html}</h3>
{:else if  tag.tagName === 'h4'}
<h4 {...tag.attributes}>{@html tag.html}</h4>
{:else if  tag.tagName === 'h5'}
<h5 {...tag.attributes}>{@html tag.html}</h5>
{:else if  tag.tagName === 'h6'}
<h6 {...tag.attributes}>{@html tag.html}</h6>
{:else if  tag.tagName === 'table'}
<table {...tag.attributes}>{@html tag.html}</table>
{:else if  tag.tagName === 'hr'}
<hr {...tag.attributes}>
{:else if  tag.tagName === 'form'}
<form {...tag.attributes}>{@html tag.html}</form>
{:else if  tag.tagName === 'details'}
<details {...tag.attributes}>{@html tag.html}</details>
{:else if  tag.tagName === 'ul'}
<ul {...tag.attributes}>{@html tag.html}</ul>
{:else if  tag.tagName === 'ol'}
<ol {...tag.attributes}>{@html tag.html}</ol>
{:else if  tag.tagName === 'dl'}
<dl {...tag.attributes}>{@html tag.html}</dl>
{:else if  tag.tagName === 'figure'}
<figure {...tag.attributes}>{@html tag.html}</figure>
{:else if  tag.tagName === 'blockquote'}
<blockquote {...tag.attributes}>{@html tag.html}</blockquote>
{:else if  tag.tagName === 'aside'}
<aside {...tag.attributes}>{@html tag.html}</aside>
{:else}
  <div {...tag.attributes}>{@html tag.html}</div>
{/if}
{#if tag.location}
  <div class="TagNotes"><span class="Location">{tag.location}</span></div>
{/if}

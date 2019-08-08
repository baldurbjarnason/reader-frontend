<script>
  // your script goes here
  export let book = { resources: []}
  $: url = new URL(book.id, window.location).href
  let cover
  $: {
    let coverResource = book.resources.filter(resource =>
      resource.rel.includes('cover')
    )[0]
    if (coverResource) {
      cover = new URL(coverResource.url, url).href
    } else {
      cover = '/static/placeholder-cover.jpg'
    }
  }
</script>

<style>
  /* your styles go here */
  .AnnotationBook {
    display: block;
    margin: 0;
    display: grid;
    grid-template-columns: 300px 1fr;
    padding: 1rem;
    grid-gap: 1rem;
  }
  .AnnotationBook-cover {
    grid-column: 1 / 2;
    width: auto;
    border-radius: var(--border-radius);
    width: 300px;
  }
  .AnnotationBook-group {
    grid-column: 2 / 3;
  }
  .AnnotationBook-title {
    font-size: 2rem;
    margin: 0;
  }
  .AnnotationBook-subtitle {
    font-size: 1.5rem;
    font-style: italic;
    margin: 0;
    font-family: 'Source Serif Pro', serif;
    color: var(--medium);
  }
  .AnnotationBook-link {
    text-decoration: none;
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="AnnotationBook">
  <img class="AnnotationBook-cover" alt="{book.description ||
      ''}" src="{cover}">
    <div class="AnnotationBook-group">
      <h1 class="AnnotationBook-title"><a href="${url}" class="AnnotationBook-link">{
  book.name
}</a></h1>
<p class="AnnotationBook-subtitle">Annotatons &amp; Notes</p>
    </div></div>
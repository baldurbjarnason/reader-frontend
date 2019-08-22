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
    grid-template-columns: 1fr 300px;
    padding: 3rem 1rem;
    grid-gap: 1rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: white;
  }
  .AnnotationBook-cover {
    grid-column: 2 / 3;
    width: auto;
    object-fit: contain;
  }
  .AnnotationBook-group {
    grid-column: 1 / 2;
  }
  .AnnotationBook-title {
    font-size: 2rem;
    margin: 0;
    line-height: 1.2;
  }
  .AnnotationBook-subtitle {
    font-size: 1.5rem;
    font-style: italic;
    margin: 0;
    font-family: 'Source Serif Pro', serif;
    color: var(--medium);
    line-height: 1.2;
  }
  .AnnotationBook-link {
    text-decoration: none;
  }
  @media (max-width: 620px) {
    .AnnotationBook {
      grid-template-columns: 1fr 100px;
    }
    .AnnotationBook-title {
      font-size: 1.25rem;
    }
    .AnnotationBook-subtitle {
      font-size: 1rem;
    }
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="AnnotationBook">
    <div class="AnnotationBook-group">
      <h1 class="AnnotationBook-title"><a href="${url}" class="AnnotationBook-link">{
        book.name
      }</a></h1>
      <p class="AnnotationBook-subtitle">Annotations &amp; Notes</p>
    </div>

  <img class="AnnotationBook-cover" alt="{book.description ||
      ''}" src="{cover}">
</div>
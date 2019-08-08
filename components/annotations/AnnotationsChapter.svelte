<script>
  // your script goes here
  import Highlight from './Highlight.svelte'
  export let annotations
  export let index
  console.log(annotations)
</script>

<style>
  /* your styles go here */
  h2 {
    text-align: center;
    margin: 1rem 0;
    padding: 0;
    color: var(--medium);
  }
</style>

<!-- markup (zero or more items) goes here -->
  <h2> Chapter {index + 1}</h2>
  {#each annotations.items as note}
    <Highlight note={note} />
  {/each}
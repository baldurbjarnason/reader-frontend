<script>
  import Tag from './Tags/Tag.svelte'
  export let html
</script>

<style>
</style>

<!-- markup (zero or more items) goes here -->
<!-- <div class="ChapterBody">{@html html }</div> -->
{#each html as tag, i}
  <Tag tag={tag} index={i} />
{/each}
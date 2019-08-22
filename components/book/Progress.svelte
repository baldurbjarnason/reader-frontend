<script>
  // your script goes here
  export let current
  export let chapters
  let scroll
  let height
</script>

<style>
  /* your styles go here */
</style>

<svelte:window bind:scrollY={scroll} bind:innerHeight={height} />
{#if chapters}
  {#each chapters as chapter}
    <!-- content here -->
    {#if chapter.url === current}
       <!-- content here -->
      <div class="Current" data-scroll={scroll} data-height={height}>&nbsp;</div>
    {:else}
      <svg height="8" width="8">
        <circle cx="4" cy="4" r="4" stroke-width="0" fill="grey" />
      </svg>
    {/if}
  {/each}
{/if}
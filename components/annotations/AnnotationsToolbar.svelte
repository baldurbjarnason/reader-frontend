<script>
  // your script goes here
  export let returnPath
  export let title
</script>

<style>
  .AnnotationsToolbar {
    display: block;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    background-color: white;
    z-index: 2;
    line-height: 1;
    padding: 0.25rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .AnnotationsToolbar-link {
    font-size: 1.25rem;
    line-height: 1rem;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    text-transform: uppercase;
    color: #32a5a5;
    color: var(--rc-dark);
  }
  .AnnotationsToolbar-title {
    text-transform: uppercase;
    font-size: .65rem;
    font-weight: 400;
    color: #555;
    color: var(--medium);
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="AnnotationsToolbar">
  <a href="{returnPath}" class="AnnotationsToolbar-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></a>
  <div class="AnnotationsToolbar-title">{title}</div>
  <div></div>
</div>
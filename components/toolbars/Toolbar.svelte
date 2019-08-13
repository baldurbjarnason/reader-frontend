<script>
  // your script goes here
  export let returnPath
</script>

<style>
  .Toolbar {
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
  .Toolbar-link {
    font-size: 1.25rem;
    line-height: 1rem;
    cursor: pointer;
    text-align: center;
    white-space: nowrap;
    text-transform: uppercase;
    color: #32a5a5;
    color: var(--rc-dark);
  }
  .Toolbar-title {
    text-transform: uppercase;
    font-size: .65rem;
    font-weight: 400;
    color: #555;
    color: var(--medium);
  }
</style>

<!-- markup (zero or more items) goes here -->
<div class="Toolbar">
  <slot name="left-button"><a href="{returnPath}" class="Toolbar-link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></a></slot>
  <div class="Toolbar-title">
    <slot></slot>
  </div>
  <div></div>
</div>
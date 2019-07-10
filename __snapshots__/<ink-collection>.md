# `<ink-collection>`

#### `ink-collection basic render`

```html
<api-provider>
  <ink-collection>
    <div class="header-row">
      <span class="label">
        Items
      </span>
      <span>
        <button
          aria-label="Settings"
          class="icon-button"
        >
        </button>
      </span>
    </div>
    <div class="items loading">
      <book-list>
        <div class="covers">
        </div>
      </book-list>
      <ink-button
        class="loader"
        data-is="ink-button"
        name="Show More..."
        secondary=""
      >
        <button class="secondary">
          Show More...
        </button>
      </ink-button>
    </div>
  </ink-collection>
</api-provider>

```


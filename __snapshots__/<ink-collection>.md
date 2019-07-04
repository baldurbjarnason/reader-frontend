# `<ink-collection>`

#### `ink-collection basic render`

```html
<api-provider>
  <ink-collection>
  </ink-collection>
  <ink-collection-modal>
    <menu-modal aria-hidden="true">
      <strong slot="modal-title">
        View Settings for ‘
        defaultViewConfig
        ’
      </strong>
      <div
        class="Stack Stack--centered"
        slot="modal-body"
      >
        <form>
          <p style="text-align: center;">
            <ink-dropdown>
              Ordered by
            </ink-dropdown>
          </p>
        </form>
        <ink-button
          data-is="ink-button"
          hidden=""
          name="Remove Collection"
        >
          <button class="">
            Remove Collection
          </button>
        </ink-button>
      </div>
    </menu-modal>
  </ink-collection-modal>
</api-provider>

```


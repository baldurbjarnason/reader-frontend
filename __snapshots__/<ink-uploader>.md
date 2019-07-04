# `<ink-uploader>`

#### `ink-uploader basic render`

```html
<api-provider>
  <ink-uploader data-is="ink-uploader">
    <div class="header-row">
      <p>
        Upload file
      </p>
      <ink-button
        compact=""
        data-is="ink-button"
        dropdown=""
        name="Uploading 0"
        secondary=""
      >
        <button class="compact dropdown secondary">
          Uploading 0
        </button>
      </ink-button>
    </div>
    <file-drop
      accept=".epub,.pdf,application/epub+zip,application/pdf"
      multiple=""
    >
      <p>
        Drop file here
      </p>
      <p>
        or
      </p>
      <p class="input">
        <input
          accept=".epub,.pdf,application/epub+zip,application/pdf"
          id="file-selector"
          multiple=""
          name="file-selector"
          type="file"
        >
      </p>
    </file-drop>
  </ink-uploader>
</api-provider>

```


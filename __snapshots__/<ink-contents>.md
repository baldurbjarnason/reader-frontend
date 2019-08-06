# `<ink-contents>`

#### `ink-contents basic render`

```html
<ink-contents
  current="chap_00012.xhtml"
  lang="en"
>
  <div
    class="page"
    id="readability-page-1"
  >
    <nav
      id="http://localhost:9876/base/demo/contents.html:id"
      role="doc-toc"
    >
      <ol>
        <li id="http://localhost:9876/base/demo/contents.html:1">
          <a
            data-href="chap_0001.xhtml"
            href="http://localhost:9876/reader/base/demo/chap_0001.xhtml"
          >
            Example Chapter 1
          </a>
        </li>
        <li id="http://localhost:9876/base/demo/contents.html:2">
          <a
            data-href="chap_00011.xhtml"
            href="http://localhost:9876/reader/base/demo/chap_00011.xhtml"
          >
            Example Chapter 1.1
          </a>
          <ol>
            <li id="http://localhost:9876/base/demo/contents.html:3">
              <a
                aria-current="page"
                data-href="chap_00012.xhtml"
                href="http://localhost:9876/reader/base/demo/chap_00012.xhtml"
              >
                Example Chapter 1.2
              </a>
            </li>
            <li id="http://localhost:9876/base/demo/contents.html:4">
              <a
                data-href="chap_00013.xhtml"
                href="http://localhost:9876/reader/base/demo/chap_00013.xhtml"
              >
                Example Chapter 1.3
              </a>
            </li>
            <li id="http://localhost:9876/base/demo/contents.html:5">
              <a
                data-href="chap_00014.xhtml"
                href="http://localhost:9876/reader/base/demo/chap_00014.xhtml"
              >
                Example Chapter 1.4
              </a>
            </li>
            <li id="http://localhost:9876/base/demo/contents.html:6">
              <a
                data-href="chap_00015.xhtml"
                href="http://localhost:9876/reader/base/demo/chap_00015.xhtml"
              >
                Example Chapter 1.5
              </a>
            </li>
            <li id="http://localhost:9876/base/demo/contents.html:7">
              <a
                data-href="chap_00016.xhtml"
                href="http://localhost:9876/reader/base/demo/chap_00016.xhtml"
              >
                Example Chapter 1.5
              </a>
            </li>
          </ol>
        </li>
        <li id="http://localhost:9876/base/demo/contents.html:8">
          <a
            data-href="chap_0002.xhtml"
            href="http://localhost:9876/reader/base/demo/chap_0002.xhtml"
          >
            Example Chapter 2
          </a>
        </li>
        <li id="http://localhost:9876/base/demo/contents.html:9">
          <a
            data-href="chap_0003.xhtml"
            href="http://localhost:9876/reader/base/demo/chap_0003.xhtml"
          >
            Example Chapter 3
          </a>
        </li>
        <li id="http://localhost:9876/base/demo/contents.html:10">
          <a
            data-href="chap_0004.xhtml"
            href="http://localhost:9876/reader/base/demo/chap_0004.xhtml"
          >
            Example Chapter 4
          </a>
        </li>
      </ol>
    </nav>
  </div>
</ink-contents>

```

```html
<div class="chapter-body">
</div>
```


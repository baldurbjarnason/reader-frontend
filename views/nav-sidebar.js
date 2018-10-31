export const navSidebarView = (render, model, req) => {
  const isSelected = path => {
    if (path === req.path) {
      return 'NavSidebar-item is-selected'
    } else {
      return 'NavSidebar-item'
    }
  }
  const ariaCurrent = path => {
    if (path === req.path) {
      return 'page'
    } else {
      return false
    }
  }
  return render(model, ':navSidebarView')`<nav class="NavSidebar">
  <h1 class="NavSidebar-title">Rebus Reader</h1>
  <ol>
    <li class="${isSelected(
    '/library'
  )}"><a href="/library" class="NavSidebar-link" aria-current=${ariaCurrent(
  '/library'
)}>Library</a></li>
    <li class="${isSelected(
    '/library/notes'
  )}"><a href="/library/notes" class="NavSidebar-link" aria-current=${ariaCurrent(
  '/library/notes'
)}>Notes</a></li>
    <li class="${isSelected(
    '/library/import'
  )}"><a href="/library/import" class="NavSidebar-link" aria-current=${ariaCurrent(
  '/library/import'
)}>Import</a></li>
    <li class="${isSelected(
    '/library/settings'
  )}"><a href="/library/settings" class="NavSidebar-link" aria-current=${ariaCurrent(
  '/library/settings'
)}>Settings</a></li>
  </ol>
</nav>`
}

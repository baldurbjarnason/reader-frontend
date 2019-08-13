export function getNavigation (url, bookPromise) {
  return Promise.resolve(bookPromise).then(book => {
    const bookURL = new URL(book.id, window.location)
    const chapterHref = new URL(url, bookURL).pathname
    const navigation = {}
    const index = book.readingOrder.map(item => item.url).indexOf(url)
    const nextItem = book.readingOrder[index + 1]
    if (nextItem) {
      navigation.next = new URL(nextItem.url, bookURL).pathname
    }
    const prevItem = book.readingOrder[index - 1]
    if (prevItem) {
      navigation.previous = new URL(prevItem.url, bookURL).pathname
    }
    navigation.current = chapterHref
    return navigation
  })
}

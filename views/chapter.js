import { clean } from '../server/utils/sanitize-state'

export const chapterView = (render, model) => {
  const { chapter = {} } = model
  return render(model, ':chapter')`<div class="Chapter">
${[clean(chapter.content)]}
</div>`
}

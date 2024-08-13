import es from '../data/es/stories.json'
import en from '../data/en/stories.json'

const lang = import.meta.env.PUBLIC_LANG
const stories = { es, en }[lang]

export default function useSaga(saga) {
  const getTime = () => {
    const accummulatedTime = getStories().reduce((acc, entry) => {
      return acc + parseInt(entry.time)
    }, 0)
    return `${Math.ceil(accummulatedTime / 60)} min`
  }

  const getStories = () => {
    return stories.filter(_story => _story.saga === saga.key)
  }

  const firstParagraph = () =>
    saga.description.split('\n').filter(p => p.trim() !== '')[0]
  const html = () =>
    saga.description
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('<br>')

  return {
    getStories,
    getTime,
    firstParagraph,
    html
  }
}

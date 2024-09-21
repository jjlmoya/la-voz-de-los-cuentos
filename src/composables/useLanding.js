import { getStories as _getStories } from '../data'
export default function useLanding(landing) {
  const getStories = () => {
    return _getStories().filter(_story => landing.keys.includes(_story.key))
  }

  const firstParagraph = () =>
    landing.description.split('\n').filter(p => p.trim() !== '')[0]
  const html = () =>
    landing.description
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('<br>')

  return {
    getStories,
    firstParagraph,
    html
  }
}

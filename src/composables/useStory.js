import sagas from '../data/sagas.json'
export default function useStory(story) {
  const firstParagraph = () =>
    story.story.split('\n').filter(p => p.trim() !== '')[0]
  const html = () =>
    story.story
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('<br>')
  const getTime = () => {
    const time = Math.ceil(parseInt(story.time) / 60)
    return `${time} min`
  }

  const getSaga = () => {
    if (!story.saga) return
    return sagas.find(_saga => _saga.key === story.saga)?.name
  }

  return {
    firstParagraph,
    getTime,
    html,
    getSaga
  }
}

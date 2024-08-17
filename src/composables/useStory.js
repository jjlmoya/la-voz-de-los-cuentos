import { getSagas as _getSagas } from '../data'
const sagas = _getSagas()
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

  const getCurrentStatus = () => {
    try {
      const state = JSON.parse(localStorage.getItem('storiesData')).find(entry => entry.key === story.key)
      const _currentPercent = Math.ceil(state.spentTime / state.totalTime * 100)
      const current = _currentPercent > 100 ? 100 : _currentPercent

      return {
        ...state,
        current
      }
    } catch (e) {
      return {}
    }
    
  }

  const isComplete = () => getCurrentStatus().current >= 100

  return {
    firstParagraph,
    getTime,
    html,
    getSaga,
    getCurrentStatus,
    isComplete
  }
}

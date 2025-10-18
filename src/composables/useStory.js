import { getSagas as _getSagas } from '../data'
import { ref, toValue } from 'vue'
const sagas = _getSagas()
export default function useStory(story) {
  const _storiesData = ref([])
  const _story = ref({})
  const firstParagraph = () =>
    story.story
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .filter(p => p.trim() !== '')[0]

  const html = () =>
    story.story
      // Normalize line endings: \r\n and \r to \n
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .split('\n')
      .filter(p => p.trim() !== '')
      .map((paragraph, index) => `<p key=${index}>${paragraph}</p>`)
      .join('')

  const getTime = () => {
    const time = Math.ceil(parseInt(story.time) / 60)
    return `${time} min`
  }

  const getSaga = () => {
    if (!story.saga) return
    return sagas.find(_saga => _saga.key === story.saga)?.name
  }

  const _getStoredData = () => {
    if (!story || !story.key) {
      console.warn('useStory: story or story.key is null/undefined')
      return
    }
    _storiesData.value = JSON.parse(localStorage.getItem('storiesData')) || []
    const data = toValue(_storiesData) || []
    _story.value = data.find(entry => entry && entry.key === story.key)
  }
  const getCurrentStatus = () => {
    try {
      _getStoredData()
      const state = toValue(_story)
      const _currentPercent = Math.ceil(
        (state.spentTime / parseInt(state.totalTime)) * 100
      )
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

  const setLikeStatus = like => {
    const storyCurrent = _story.value
    storyCurrent.like = like
    _story.value = storyCurrent
    _setStoriesData()
  }

  const _setStoriesData = () => {
    if (!story || !story.key) {
      console.warn('useStory: cannot save - story or story.key is null/undefined')
      return
    }
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const index = storiesData.findIndex(
      entry => entry && entry.key === story.key
    )
    if (index === -1) {
      storiesData.push(toValue(_story))
    } else {
      storiesData[index] = toValue(_story)
    }
    localStorage.setItem('storiesData', JSON.stringify(storiesData))
  }

  const _updateTimeSpent = () => {
    if (!_story.value || _story.value.spentTime === undefined) {
      console.warn('useStory: cannot update time - story data not initialized')
      return
    }
    let currentStory = _story.value
    currentStory.spentTime += 10
    if (currentStory.spentTime >= parseInt(currentStory.totalTime)) {
      currentStory.finished = true
      // Capture completedAt timestamp when story is finished
      if (!currentStory.completedAt) {
        currentStory.completedAt = Date.now()
      }
    }
    _story.value = currentStory
    _setStoriesData()
  }

  const reading = () => {
    _getStoredData()

    // Inicializar si no existe
    if (!_story.value || Object.keys(_story.value).length === 0) {
      _story.value = {
        key: story.key,
        spentTime: 0,
        totalTime: parseInt(story.time),
        finished: false,
        like: false,
        startedAt: Date.now()
      }
    } else if (!_story.value.startedAt) {
      _story.value.startedAt = Date.now()
    }

    _setStoriesData()
    setInterval(_updateTimeSpent, 10000)
  }

  return {
    firstParagraph,
    getTime,
    html,
    getSaga,
    getCurrentStatus,
    setLikeStatus,
    isComplete,
    reading
  }
}

/*

  document.addEventListener('DOMContentLoaded', () => {
    const story =
      JSON.parse(
        document.getElementById('story-data').getAttribute('data-story')
      ) ?? {}
    const storyKey = story.key
    const storyTime = parseInt(story.time)

    function getStoriesData() {
      return JSON.parse(localStorage.getItem('storiesData')) || []
    }

    function updateStoryData() {
      let storiesData = getStoriesData()
      let storyIndex = storiesData.findIndex(s => s.key === storyKey)

      if (storyIndex === -1) {
        storiesData.push({
          key: storyKey,
          spentTime: 0,
          totalTime: storyTime,
          finished: false,
          like: false
        })
      }

      setStoriesData(storiesData)
    }
    updateStoryData()

   
  })
*/

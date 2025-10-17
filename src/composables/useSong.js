import { ref, toValue } from 'vue'

/**
 * Composable for tracking song listening with timestamps
 * Integrates with YouTube player events to capture start/end
 */
export default function useSong(song) {
  const _songsData = ref([])
  const _song = ref({})
  let _listeningInterval = null

  const _getStoredData = () => {
    _songsData.value = JSON.parse(localStorage.getItem('songsData')) || []
    _song.value = toValue(_songsData).find(entry => entry.key === song.key)
  }

  const _setSongsData = () => {
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []
    const index = toValue(_songsData).findIndex(
      entry => entry.key === song.key
    )
    if (index === -1) {
      songsData.push({
        key: song.key,
        listenTime: 0,
        totalTime: song.duration || 0,
        finished: false,
        like: false,
        startedAt: null,
        completedAt: null
      })
    }
    songsData[index] = toValue(_song)
    localStorage.setItem('songsData', JSON.stringify(songsData))
  }

  const _updateListenTime = () => {
    let currentSong = _song.value
    currentSong.listenTime += 1 // Increment by 1 second

    // Mark as finished if song is fully listened (90% threshold to account for endings)
    if (currentSong.totalTime && currentSong.listenTime >= currentSong.totalTime * 0.9) {
      currentSong.finished = true
      // Capture completedAt timestamp when song is finished
      if (!currentSong.completedAt) {
        currentSong.completedAt = Date.now()
      }
    }

    _song.value = currentSong
    _setSongsData()
  }

  /**
   * Called when the song starts playing (YouTube player PLAYING state)
   */
  const onSongStart = () => {
    _getStoredData()
    _setSongsData()

    // Capture startedAt timestamp on first play
    if (_song.value && !_song.value.startedAt) {
      _song.value.startedAt = Date.now()
      _setSongsData()
    }

    // Start tracking listen time every second
    if (!_listeningInterval) {
      _listeningInterval = setInterval(_updateListenTime, 1000)
    }
  }

  /**
   * Called when the song stops/pauses
   */
  const onSongPause = () => {
    if (_listeningInterval) {
      clearInterval(_listeningInterval)
      _listeningInterval = null
    }
  }

  /**
   * Called when the song ends (YouTube player ENDED state)
   */
  const onSongEnd = () => {
    onSongPause()

    // Mark as finished and capture completedAt
    let currentSong = _song.value
    currentSong.finished = true
    if (!currentSong.completedAt) {
      currentSong.completedAt = Date.now()
    }
    _song.value = currentSong
    _setSongsData()
  }

  const setLikeStatus = like => {
    const songCurrent = _song.value
    songCurrent.like = like
    _song.value = songCurrent
    _setSongsData()
  }

  const getCurrentStatus = () => {
    try {
      _getStoredData()
      const state = toValue(_song)
      const _currentPercent = state.totalTime
        ? Math.ceil((state.listenTime / state.totalTime) * 100)
        : 0
      const current = _currentPercent > 100 ? 100 : _currentPercent

      return {
        ...state,
        current
      }
    } catch (e) {
      return {}
    }
  }

  const isComplete = () => getCurrentStatus().current >= 90

  const cleanup = () => {
    if (_listeningInterval) {
      clearInterval(_listeningInterval)
      _listeningInterval = null
    }
  }

  return {
    onSongStart,
    onSongPause,
    onSongEnd,
    setLikeStatus,
    getCurrentStatus,
    isComplete,
    cleanup
  }
}

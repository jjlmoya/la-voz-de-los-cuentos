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
    _song.value = toValue(_songsData).find(entry => entry.key === song.key) || {
      key: song.key,
      listenTime: 0,
      totalTime: song.duration || 0,
      finished: false,
      like: false,
      startedAt: null,
      completedAt: null
    }
  }

  const _setSongsData = () => {
    let songsData = JSON.parse(localStorage.getItem('songsData')) || []
    // Limpiar elementos sin key
    songsData = songsData.filter(entry => entry && entry.key)

    const index = songsData.findIndex(
      entry => entry.key === song.key
    )
    if (index === -1) {
      songsData.push(toValue(_song))
    } else {
      songsData[index] = toValue(_song)
    }
    localStorage.setItem('songsData', JSON.stringify(songsData))
    // Emit event so StreakCard can recalculate
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('storage:updated'))
    }
  }

  const _updateListenTime = () => {
    let currentSong = _song.value

    // Safety check: ensure currentSong and listenTime are valid
    if (!currentSong || typeof currentSong.listenTime !== 'number') {
      console.warn('Invalid song data during listen time update')
      return
    }

    currentSong.listenTime += 1 // Increment by 1 second

    // Mark as finished if progress reaches 90%
    const status = getCurrentStatus()
    if (status.current >= 90 && !currentSong.finished) {
      currentSong.finished = true
      // Capture completedAt timestamp when song is finished
      currentSong.completedAt = Date.now()
      console.log('Canción marcada como completada:', currentSong.key, 'a las', new Date(currentSong.completedAt).toLocaleTimeString())
    }

    _song.value = currentSong
    _setSongsData()
  }

  /**
   * Called when the song starts playing (YouTube player PLAYING state)
   */
  const onSongStart = () => {
    _getStoredData()

    // Capture startedAt timestamp on first play
    if (_song.value && !_song.value.startedAt) {
      _song.value.startedAt = Date.now()
    }

    _setSongsData()

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
    if (!currentSong) {
      console.warn('No song data available on end')
      return
    }
    currentSong.finished = true
    if (!currentSong.completedAt) {
      currentSong.completedAt = Date.now()
      console.log('Song completed at:', new Date(currentSong.completedAt).toISOString())
    }
    _song.value = currentSong
    _setSongsData()
  }

  const setLikeStatus = like => {
    const songCurrent = _song.value
    if (!songCurrent) {
      console.warn('No song data available to set like status')
      return
    }
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

  const setDuration = (duration) => {
    if (_song.value) {
      _song.value.totalTime = duration
      console.log('useSong - Duration set to:', duration)
      _setSongsData()
    }
  }

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
    setDuration,
    getCurrentStatus,
    isComplete,
    cleanup
  }
}

/**
 * Composable for calculating daily reading/listening streaks
 * Combines both stories and songs for comprehensive streak tracking
 */

interface StorageData {
  key: string
  finished: boolean
  completedAt?: number | null
}

interface StreakData {
  currentStreak: number
  bestStreak: number
  lastReadDate: string | null
  daysSinceLastRead: number
  hasStreakToday: boolean
  uniqueDatesCompleted: Set<string>
}

/**
 * Convert timestamp to local date string (YYYY-MM-DD)
 * Handles timezone differences properly
 */
function timestampToLocalDate(timestamp: number): string {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Get today's date string (YYYY-MM-DD) in user's local timezone
 */
function getTodayDateString(): string {
  return timestampToLocalDate(Date.now())
}

/**
 * Calculate the number of days between two date strings (YYYY-MM-DD format)
 */
function getDaysBetweenDates(dateStr1: string, dateStr2: string): number {
  const date1 = new Date(dateStr1)
  const date2 = new Date(dateStr2)
  const diffTime = Math.abs(date2.getTime() - date1.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * Get all completed stories from localStorage
 */
function getCompletedStories(): StorageData[] {
  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    return storiesData.filter((entry: StorageData) => entry.finished && entry.completedAt)
  } catch (e) {
    console.error('Error reading storiesData from localStorage:', e)
    return []
  }
}

/**
 * Get all completed songs from localStorage
 */
function getCompletedSongs(): StorageData[] {
  try {
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []
    return songsData.filter((entry: StorageData) => entry.finished && entry.completedAt)
  } catch (e) {
    console.error('Error reading songsData from localStorage:', e)
    return []
  }
}

/**
 * Group completed items by date and calculate streaks
 */
function calculateStreaks(): StreakData {
  const completedStories = getCompletedStories()
  const completedSongs = getCompletedSongs()
  const allCompleted = [...completedStories, ...completedSongs]

  // Create a set of unique dates with completions
  const uniqueDateSet = new Set<string>()
  const datesList: string[] = []

  allCompleted.forEach(item => {
    if (item.completedAt) {
      const dateStr = timestampToLocalDate(item.completedAt)
      if (dateStr && !uniqueDateSet.has(dateStr)) {
        uniqueDateSet.add(dateStr)
        datesList.push(dateStr)
      }
    }
  })

  // Sort dates in descending order (most recent first)
  datesList.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  const today = getTodayDateString()
  const hasStreakToday = uniqueDateSet.has(today)
  const lastReadDate = datesList.length > 0 ? datesList[0] : null

  // Calculate current streak
  let currentStreak = 0
  if (datesList.length > 0) {
    let expectedDate = new Date(today)
    let streakActive = true

    for (const dateStr of datesList) {
      const expectedDateStr = `${expectedDate.getFullYear()}-${String(expectedDate.getMonth() + 1).padStart(2, '0')}-${String(expectedDate.getDate()).padStart(2, '0')}`

      if (dateStr === expectedDateStr) {
        currentStreak++
        expectedDate.setDate(expectedDate.getDate() - 1)
      } else if (streakActive) {
        // Streak broken
        streakActive = false
        break
      }
    }
  }

  // Calculate best streak by finding longest consecutive sequence
  let bestStreak = 0
  if (datesList.length > 0) {
    let tempStreak = 1
    for (let i = 1; i < datesList.length; i++) {
      const prev = new Date(datesList[i - 1])
      const current = new Date(datesList[i])
      const diffDays = Math.ceil((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24))

      if (diffDays === 1) {
        tempStreak++
      } else {
        bestStreak = Math.max(bestStreak, tempStreak)
        tempStreak = 1
      }
    }
    bestStreak = Math.max(bestStreak, tempStreak)
  }

  // Calculate days since last read
  let daysSinceLastRead = 0
  if (lastReadDate) {
    daysSinceLastRead = getDaysBetweenDates(lastReadDate, today)
  }

  return {
    currentStreak,
    bestStreak,
    lastReadDate,
    daysSinceLastRead,
    hasStreakToday,
    uniqueDateSet
  }
}

/**
 * Check if user has any historical data (for retrocompatibility)
 */
function hasHistoricalData(): boolean {
  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []

    // Check if there are finished items with timestamps
    const storiesWithTimestamps = storiesData.some(
      (entry: StorageData) => entry.finished && entry.completedAt
    )
    const songsWithTimestamps = songsData.some(
      (entry: StorageData) => entry.finished && entry.completedAt
    )

    return storiesWithTimestamps || songsWithTimestamps
  } catch (e) {
    return false
  }
}

/**
 * Get count of finished items without timestamps (legacy data)
 */
function getLegacyDataCount(): number {
  try {
    const storiesData = JSON.parse(localStorage.getItem('storiesData')) || []
    const songsData = JSON.parse(localStorage.getItem('songsData')) || []

    const legacyStories = storiesData.filter(
      (entry: StorageData) => entry.finished && !entry.completedAt
    )
    const legacySongs = songsData.filter(
      (entry: StorageData) => entry.finished && !entry.completedAt
    )

    return legacyStories.length + legacySongs.length
  } catch (e) {
    return 0
  }
}

export function useStreaks() {
  const streakData = calculateStreaks()
  const hasData = hasHistoricalData()
  const legacyCount = getLegacyDataCount()

  return {
    // Main streak data
    currentStreak: streakData.currentStreak,
    bestStreak: streakData.bestStreak,
    lastReadDate: streakData.lastReadDate,
    daysSinceLastRead: streakData.daysSinceLastRead,
    hasStreakToday: streakData.hasStreakToday,

    // Data availability
    hasHistoricalData: hasData,
    legacyDataCount,

    // Helper functions
    getStreakStatus(): string {
      if (!hasData && legacyCount === 0) {
        return 'no_data'
      }
      if (!hasData && legacyCount > 0) {
        return 'legacy_data'
      }
      return 'has_data'
    },

    getStreakMessage(): string {
      const status = this.getStreakStatus()

      if (status === 'no_data') {
        return 'Start reading or listening to begin your streak!'
      }
      if (status === 'legacy_data') {
        return `Unknown streak (${legacyCount} items without timestamps)`
      }

      let message = `Current Streak: ${this.currentStreak} days`
      if (!this.hasStreakToday) {
        message += ' (frozen - read today to continue)'
      }

      return message
    },

    // Refresh data
    refresh(): void {
      const updated = calculateStreaks()
      Object.assign(streakData, updated)
    },

    // Export for testing
    _calculateStreaks: calculateStreaks,
    _timestampToLocalDate: timestampToLocalDate,
    _getTodayDateString: getTodayDateString,
    _getCompletedStories: getCompletedStories,
    _getCompletedSongs: getCompletedSongs
  }
}

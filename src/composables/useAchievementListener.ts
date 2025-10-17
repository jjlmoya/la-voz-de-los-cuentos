/**
 * Composable desacoplado que escucha cambios en historias
 * Monitorea localStorage de storiesData sin modificar useStory.js
 */

import { ref } from 'vue'
import { emitAchievementUnlock } from '../achievements/achievementEvents'
import {
  saveAchievementUnlock,
  updateAchievementProgress,
  isAchievementUnlocked,
  getAchievementState
} from '../achievements/achievementStorage'
import { ALL_ACHIEVEMENT_DEFINITIONS } from '../achievements/achievements.config'
import { getStories, getCharacters } from '../data'

interface StoredStory {
  key: string
  spentTime: number
  totalTime: number | string
  finished: boolean
  like: boolean
}

const storiesCache = ref<any[]>([])
const charactersCache = ref<any[]>([])

function loadDataCache() {
  try {
    storiesCache.value = getStories()
    charactersCache.value = getCharacters()
  } catch (error) {
  }
}

const lastStoriesData = ref<StoredStory[]>([])
let watcherActive = false


function getStoriesDataFromStorage(): StoredStory[] {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const data = localStorage.getItem('storiesData')
    return data ? JSON.parse(data) : []
  } catch (error) {
    return []
  }
}

function checkForNewCompletedStories(): void {
  const currentStories = getStoriesDataFromStorage()
  const previousStories = lastStoriesData.value

  let hasNewCompletion = false
  let hasLikeChange = false

  currentStories.forEach(currentStory => {
    const previousStory = previousStories.find(s => s.key === currentStory.key)

    const isCurrentlyComplete = currentStory.spentTime >= parseFloat(String(currentStory.totalTime))
    const wasPreviouslyComplete = previousStory && previousStory.spentTime >= parseFloat(String(previousStory.totalTime))

    if (isCurrentlyComplete && !wasPreviouslyComplete) {
      handleStoryCompleted(currentStory)
      hasNewCompletion = true
    }

    const isCurrentlyLiked = currentStory.like === true
    const wasPreviouslyLiked = previousStory && previousStory.like === true

    if (isCurrentlyLiked !== wasPreviouslyLiked) {
      hasLikeChange = true
    }
  })

  if (hasNewCompletion) {
    checkReadingAchievements()
  }

  if (hasLikeChange) {
    checkFavoriteAchievements()
  }

  if (hasNewCompletion || hasLikeChange) {
    checkSagaAchievements()
    checkCharacterAchievements()
    checkSpecialAchievements()
  }

  lastStoriesData.value = JSON.parse(JSON.stringify(currentStories))
}

function handleStoryCompleted(story: StoredStory): void {}

function checkReadingAchievements(): void {
  const stories = getStoriesDataFromStorage()
  const completedCount = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime))).length

  const readAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'read')

  readAchievements.forEach(definition => {
    const threshold = definition.threshold || 1

    if (completedCount >= threshold && !isAchievementUnlocked(definition.id)) {
      unlockAchievement(definition.id)
    }

    updateAchievementProgress(definition.id, completedCount, threshold)
  })
}

function checkFavoriteAchievements(): void {
  const stories = getStoriesDataFromStorage()
  const favoriteCount = stories.filter(s => s.like === true).length

  const favoriteAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'favorite')

  favoriteAchievements.forEach(definition => {
    const threshold = definition.threshold || 1

    if (favoriteCount >= threshold && !isAchievementUnlocked(definition.id)) {
      unlockAchievement(definition.id)
    }

    updateAchievementProgress(definition.id, favoriteCount, threshold)
  })
}

function checkSagaAchievements(): void {
  try {
    if (storiesCache.value.length === 0) {
      loadDataCache()
    }

    const completedStories = getStoriesDataFromStorage().filter(
      s => s.spentTime >= parseFloat(String(s.totalTime))
    )

    const sagasCompleted: Record<string, number> = {}
    completedStories.forEach(story => {
      const storyDef = storiesCache.value.find(s => s.key === story.key)
      if (storyDef?.saga && storyDef.saga.trim() !== '') {
        sagasCompleted[storyDef.saga] = (sagasCompleted[storyDef.saga] || 0) + 1
      }
    })

    const sagaStoryCounts: Record<string, number> = {}
    storiesCache.value.forEach(story => {
      if (story.saga && story.saga.trim() !== '') {
        sagaStoryCounts[story.saga] = (sagaStoryCounts[story.saga] || 0) + 1
      }
    })

    const sagaAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'saga')

    sagaAchievements.forEach(definition => {
      const threshold = definition.threshold || 1

      if (definition.id.startsWith('saga-') && definition.id !== 'saga-all') {
        const numSagasCompleted = Object.keys(sagasCompleted).length
        const shouldUnlock = numSagasCompleted >= threshold

        if (shouldUnlock && !isAchievementUnlocked(definition.id)) {
          unlockAchievement(definition.id)
        }

        updateAchievementProgress(definition.id, Math.min(numSagasCompleted, threshold), threshold)
      }
      else if (definition.id === 'saga-all') {
        let allSagasComplete = false
        let completedSagasCount = 0

        Object.entries(sagaStoryCounts).forEach(([sagaKey, totalCount]) => {
          const completedCount = sagasCompleted[sagaKey] || 0
          if (completedCount === totalCount) {
            completedSagasCount++
          }
        })

        allSagasComplete = completedSagasCount === Object.keys(sagaStoryCounts).length && Object.keys(sagaStoryCounts).length > 0

        if (allSagasComplete && !isAchievementUnlocked('saga-all')) {
          unlockAchievement('saga-all')
        }

        updateAchievementProgress('saga-all', allSagasComplete ? 1 : 0, 1)
      }
    })
  } catch (error) {
  }
}

function checkCharacterAchievements(): void {
  try {
    if (charactersCache.value.length === 0 || storiesCache.value.length === 0) {
      loadDataCache()
    }

    const completedStories = getStoriesDataFromStorage().filter(
      s => s.spentTime >= parseFloat(String(s.totalTime))
    )

    const charactersCompleted: Record<string, Set<string>> = {}
    completedStories.forEach(story => {
      const storyDef = storiesCache.value.find(s => s.key === story.key)
      if (storyDef?.saga && storyDef.saga.trim() !== '') {
        const sagaCharacters = charactersCache.value.filter(c => c.saga === storyDef.saga)
        sagaCharacters.forEach(char => {
          if (!charactersCompleted[char.key]) {
            charactersCompleted[char.key] = new Set()
          }
          charactersCompleted[char.key].add(story.key)
        })
      }
    })

    const characterStoryCounts: Record<string, Set<string>> = {}
    storiesCache.value.forEach(story => {
      if (story.saga && story.saga.trim() !== '') {
        const sagaCharacters = charactersCache.value.filter(c => c.saga === story.saga)
        sagaCharacters.forEach(char => {
          if (!characterStoryCounts[char.key]) {
            characterStoryCounts[char.key] = new Set()
          }
          characterStoryCounts[char.key].add(story.key)
        })
      }
    })

    const charAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'character')

    charAchievements.forEach(definition => {
      const threshold = definition.threshold || 1

      if (definition.id === 'char-5') {
        const hasCharWith5 = Object.entries(charactersCompleted).some(
          ([charKey, storyKeys]) => storyKeys.size >= 5
        )

        if (hasCharWith5 && !isAchievementUnlocked('char-5')) {
          unlockAchievement('char-5')
        }

        const maxStories = Math.max(
          ...Object.values(charactersCompleted).map(s => s.size),
          0
        )
        updateAchievementProgress('char-5', Math.min(maxStories, threshold), threshold)
      }
      else if (definition.id === 'char-10') {
        const hasCharWith10 = Object.entries(charactersCompleted).some(
          ([charKey, storyKeys]) => storyKeys.size >= 10
        )

        if (hasCharWith10 && !isAchievementUnlocked('char-10')) {
          unlockAchievement('char-10')
        }

        const maxStories = Math.max(
          ...Object.values(charactersCompleted).map(s => s.size),
          0
        )
        updateAchievementProgress('char-10', Math.min(maxStories, threshold), threshold)
      }
      else if (definition.id === 'char-all') {
        const hasCompleteCharacter = Object.entries(characterStoryCounts).some(
          ([charKey, totalStories]) => {
            const completed = charactersCompleted[charKey]?.size || 0
            return completed === totalStories.size && totalStories.size > 0
          }
        )

        if (hasCompleteCharacter && !isAchievementUnlocked('char-all')) {
          unlockAchievement('char-all')
        }

        updateAchievementProgress('char-all', hasCompleteCharacter ? 1 : 0, 1)
      }
      else if (definition.id === 'char-profiles') {
        const uniqueCharactersWithStories = Object.entries(charactersCompleted)
          .filter(([charKey, storyKeys]) => storyKeys.size > 0).length

        if (uniqueCharactersWithStories >= threshold && !isAchievementUnlocked('char-profiles')) {
          unlockAchievement('char-profiles')
        }

        updateAchievementProgress('char-profiles', Math.min(uniqueCharactersWithStories, threshold), threshold)
      }
    })
  } catch (error) {
  }
}

function checkSpecialAchievements(): void {
  try {
    const stories = getStoriesDataFromStorage()
    const completedCount = stories.filter(s => s.spentTime >= parseFloat(String(s.totalTime))).length

    const specialAchievements = ALL_ACHIEVEMENT_DEFINITIONS.filter(d => d.type === 'special')

    specialAchievements.forEach(definition => {
      updateAchievementProgress(definition.id, 0, 1)
    })
  } catch (error) {
  }
}

function unlockAchievement(achievementId: string): void {
  const achievement = ALL_ACHIEVEMENT_DEFINITIONS.find(d => d.id === achievementId)
  if (!achievement) return

  const unlockedAt = new Date()
  saveAchievementUnlock(achievementId, unlockedAt)

  emitAchievementUnlock({
    achievement: {
      id: achievement.id,
      type: achievement.type,
      nameKey: achievement.nameKey,
      descriptionKey: achievement.descriptionKey,
      iconId: achievement.iconId,
      unlocked: true,
      unlockedAt,
      threshold: achievement.threshold,
      metadata: achievement.metadata
    },
    unlockedAt,
    isNew: true
  })
}

export function useAchievementListener() {
  function startListening(): () => void {
    if (watcherActive) {
      return () => {}
    }

    watcherActive = true
    lastStoriesData.value = getStoriesDataFromStorage()

    loadDataCache()

    const interval = setInterval(() => {
      checkForNewCompletedStories()
    }, 2000) 

    return () => {
      clearInterval(interval)
      watcherActive = false
    }
  }

  function forceCheck(): void {
    checkReadingAchievements()
    checkFavoriteAchievements()
    checkSagaAchievements()
    checkCharacterAchievements()
    checkSpecialAchievements()
  }

  function resetCache(): void {
    lastStoriesData.value = []
  }

  return {
    startListening,
    forceCheck,
    resetCache
  }
}

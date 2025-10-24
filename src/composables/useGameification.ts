/**
 * Composable for gamification system with levels and XP
 * Handles XP calculation, leveling progression, and player profile data
 */

import { ref, computed, readonly, watch } from 'vue'
import useStories from './useStories'

interface PlayerProfile {
  level: number
  totalXP: number
  currentLevelXP: number
  nextLevelXP: number
  title: string
  titleKey: string
  avatar: number
  color: string
}

interface LevelDefinition {
  level: number
  titleKey: string
  minXP: number
  maxXP: number
  color: string
  tier: 'apprentice' | 'adventurer' | 'explorer' | 'guardian' | 'master'
}

// Level definitions based on issue #73
const LEVEL_DEFINITIONS: LevelDefinition[] = [
  // Tier 1: Apprentice (Levels 1-3) - Blue
  { level: 1, titleKey: 'gamification.level.apprentice', minXP: 0, maxXP: 1000, color: 'blue', tier: 'apprentice' },
  { level: 2, titleKey: 'gamification.level.apprentice', minXP: 1000, maxXP: 2000, color: 'blue', tier: 'apprentice' },
  { level: 3, titleKey: 'gamification.level.apprentice', minXP: 2000, maxXP: 3000, color: 'blue', tier: 'apprentice' },

  // Tier 2: Adventurer (Levels 4-6) - Green
  { level: 4, titleKey: 'gamification.level.adventurer', minXP: 3000, maxXP: 4500, color: 'green', tier: 'adventurer' },
  { level: 5, titleKey: 'gamification.level.adventurer', minXP: 4500, maxXP: 6000, color: 'green', tier: 'adventurer' },
  { level: 6, titleKey: 'gamification.level.adventurer', minXP: 6000, maxXP: 7500, color: 'green', tier: 'adventurer' },

  // Tier 3: Explorer (Levels 7-9) - Purple
  { level: 7, titleKey: 'gamification.level.explorer', minXP: 7500, maxXP: 9500, color: 'purple', tier: 'explorer' },
  { level: 8, titleKey: 'gamification.level.explorer', minXP: 9500, maxXP: 11500, color: 'purple', tier: 'explorer' },
  { level: 9, titleKey: 'gamification.level.explorer', minXP: 11500, maxXP: 13500, color: 'purple', tier: 'explorer' },

  // Tier 4: Guardian (Levels 10-15) - Gold
  { level: 10, titleKey: 'gamification.level.guardian', minXP: 13500, maxXP: 15500, color: 'gold', tier: 'guardian' },
  { level: 11, titleKey: 'gamification.level.guardian', minXP: 15500, maxXP: 17500, color: 'gold', tier: 'guardian' },
  { level: 12, titleKey: 'gamification.level.guardian', minXP: 17500, maxXP: 19500, color: 'gold', tier: 'guardian' },
  { level: 13, titleKey: 'gamification.level.guardian', minXP: 19500, maxXP: 21500, color: 'gold', tier: 'guardian' },
  { level: 14, titleKey: 'gamification.level.guardian', minXP: 21500, maxXP: 23500, color: 'gold', tier: 'guardian' },
  { level: 15, titleKey: 'gamification.level.guardian', minXP: 23500, maxXP: 25500, color: 'gold', tier: 'guardian' },

  // Tier 5: Master (Levels 16-20) - Silver/Diamond
  { level: 16, titleKey: 'gamification.level.master', minXP: 25500, maxXP: 27500, color: 'silver', tier: 'master' },
  { level: 17, titleKey: 'gamification.level.master', minXP: 27500, maxXP: 29500, color: 'silver', tier: 'master' },
  { level: 18, titleKey: 'gamification.level.master', minXP: 29500, maxXP: 31500, color: 'silver', tier: 'master' },
  { level: 19, titleKey: 'gamification.level.master', minXP: 31500, maxXP: 33500, color: 'silver', tier: 'master' },
  { level: 20, titleKey: 'gamification.level.master', minXP: 33500, maxXP: 40000, color: 'silver', tier: 'master' }
]

// XP rewards per activity
const XP_REWARDS = {
  completeStory: (durationMinutes: number) => 100 + Math.floor(durationMinutes / 10),
  favorite: 10,
  halfProgressReward: 50,
  songCompletion: 75
}

export default function useGameification() {
  const { getCompleteStories, getFavoriteStories, getStories } = useStories()

  const playerProfile = ref<PlayerProfile>({
    level: 1,
    totalXP: 0,
    currentLevelXP: 0,
    nextLevelXP: 1000,
    title: 'Aprendiz de Historias',
    titleKey: 'gamification.level.apprentice',
    avatar: 1,
    color: 'blue'
  })

  /**
   * Load player profile from localStorage
   */
  function loadPlayerProfile(): void {
    if (typeof localStorage === 'undefined') return

    const stored = localStorage.getItem('playerProfile')
    if (stored) {
      try {
        playerProfile.value = JSON.parse(stored)
      } catch (e) {
        console.warn('Failed to load player profile', e)
        initializePlayerProfile()
      }
    } else {
      initializePlayerProfile()
    }
  }

  /**
   * Save player profile to localStorage
   */
  function savePlayerProfile(): void {
    if (typeof localStorage === 'undefined') return
    localStorage.setItem('playerProfile', JSON.stringify(playerProfile.value))
  }

  /**
   * Initialize player profile with default values
   */
  function initializePlayerProfile(): void {
    playerProfile.value = {
      level: 1,
      totalXP: 0,
      currentLevelXP: 0,
      nextLevelXP: 1000,
      title: 'Aprendiz de Historias',
      titleKey: 'gamification.level.apprentice',
      avatar: 1,
      color: 'blue'
    }
    savePlayerProfile()
  }

  /**
   * Calculate XP from reading a story
   * Returns { baseXP, bonusXP, totalXP }
   */
  function calculateStoryXP(storyKey: string): { baseXP: number; bonusXP: number; totalXP: number } {
    const allStories = getStories()
    const story = allStories.find(s => s.key === storyKey)
    if (!story) {
      return { baseXP: 0, bonusXP: 0, totalXP: 0 }
    }

    const durationMinutes = Math.ceil(parseInt(story.time) / 60)
    const baseXP = XP_REWARDS.completeStory(durationMinutes)

    // Check for 50%+ progress bonus
    let storiesData: any[] = []
    if (typeof localStorage !== 'undefined') {
      storiesData = JSON.parse(localStorage.getItem('storiesData') || '[]')
    }
    const storyData = storiesData.find((s: any) => s.key === storyKey)
    let bonusXP = 0

    if (storyData && storyData.spentTime && storyData.totalTime) {
      const progress = (storyData.spentTime / storyData.totalTime) * 100
      if (progress >= 50) {
        bonusXP = XP_REWARDS.halfProgressReward
      }
    }

    // Add bonus if favorited
    const favorites = getFavoriteStories()
    if (favorites.some(s => s.key === storyKey)) {
      bonusXP += XP_REWARDS.favorite
    }

    return {
      baseXP,
      bonusXP,
      totalXP: baseXP + bonusXP
    }
  }

  /**
   * Add XP and handle level up
   */
  function addXP(amount: number): { leveledUp: boolean; newLevel: number } {
    const oldLevel = playerProfile.value.level
    playerProfile.value.totalXP += amount
    playerProfile.value.currentLevelXP += amount

    // Check for level up
    let leveledUp = false
    let newLevel = oldLevel

    while (playerProfile.value.level < 20) {
      const currentLevelDef = LEVEL_DEFINITIONS[playerProfile.value.level - 1]
      const nextLevelDef = LEVEL_DEFINITIONS[playerProfile.value.level]

      if (playerProfile.value.totalXP >= nextLevelDef.minXP) {
        playerProfile.value.level = nextLevelDef.level
        playerProfile.value.currentLevelXP = playerProfile.value.totalXP - nextLevelDef.minXP
        playerProfile.value.nextLevelXP = nextLevelDef.maxXP - nextLevelDef.minXP
        playerProfile.value.title = getTitleForLevel(nextLevelDef.level)
        playerProfile.value.titleKey = nextLevelDef.titleKey
        playerProfile.value.avatar = nextLevelDef.level
        playerProfile.value.color = nextLevelDef.color
        newLevel = nextLevelDef.level
        leveledUp = true
      } else {
        break
      }
    }

    // Cap at level 20
    if (playerProfile.value.level > 20) {
      playerProfile.value.level = 20
      const maxLevel = LEVEL_DEFINITIONS[19]
      playerProfile.value.nextLevelXP = maxLevel.maxXP - maxLevel.minXP
    }

    savePlayerProfile()
    return { leveledUp, newLevel }
  }

  /**
   * Get title for a specific level
   */
  function getTitleForLevel(level: number): string {
    const levelDef = LEVEL_DEFINITIONS[level - 1]
    if (!levelDef) return 'Aprendiz de Historias'

    const titles: Record<string, string> = {
      'gamification.level.apprentice': 'Aprendiz de Historias',
      'gamification.level.adventurer': 'Lector Aventurero',
      'gamification.level.explorer': 'Explorador de Mundos',
      'gamification.level.guardian': 'Guardián de Sagas',
      'gamification.level.master': 'Maestro de Cuentos'
    }

    return titles[levelDef.titleKey] || 'Aprendiz de Historias'
  }

  /**
   * Calculate retroactive XP for existing completed stories
   */
  function calculateRetroactiveXP(): number {
    const completeStories = getCompleteStories()
    let totalRetroXP = 0

    completeStories.forEach(story => {
      const xpData = calculateStoryXP(story.key)
      totalRetroXP += xpData.totalXP
    })

    return totalRetroXP
  }

  /**
   * Initialize player with retroactive XP from completed stories
   * Recalculates XP based on actual completed stories in localStorage
   */
  function initializeWithRetroactiveXP(): void {
    loadPlayerProfile()

    // Always recalculate XP from completed stories (source of truth)
    const retroXP = calculateRetroactiveXP()

    // Only update if there's actual XP to add and current profile has less
    if (retroXP > playerProfile.value.totalXP) {
      playerProfile.value.totalXP = retroXP
      const updated = getLevelFromXP(retroXP)
      playerProfile.value.level = updated.level
      playerProfile.value.currentLevelXP = updated.minXP ? retroXP - updated.minXP : 0
      playerProfile.value.nextLevelXP = updated.maxXP - (updated.minXP || 0)
      playerProfile.value.title = getTitleForLevel(updated.level)
      playerProfile.value.avatar = updated.level
      playerProfile.value.color = updated.color
      savePlayerProfile()
    }
  }

  /**
   * Process story completion and award XP
   */
  function onStoryCompleted(storyKey: string): { xpGained: number; leveledUp: boolean; newLevel: number } {
    const xpData = calculateStoryXP(storyKey)
    const { leveledUp, newLevel } = addXP(xpData.totalXP)

    return {
      xpGained: xpData.totalXP,
      leveledUp,
      newLevel
    }
  }

  /**
   * Get next level info
   */
  const nextLevelInfo = computed(() => {
    if (playerProfile.value.level >= 20) {
      return {
        level: 20,
        xpNeeded: 0,
        xpProgress: 100,
        isMaxLevel: true
      }
    }

    const currentLevel = playerProfile.value.level
    const nextLevel = currentLevel + 1
    const nextLevelDef = LEVEL_DEFINITIONS[nextLevel - 1]

    return {
      level: nextLevel,
      xpNeeded: nextLevelDef.minXP - playerProfile.value.totalXP,
      xpProgress: (playerProfile.value.currentLevelXP / playerProfile.value.nextLevelXP) * 100,
      isMaxLevel: false
    }
  })

  /**
   * Get level info from XP
   */
  function getLevelFromXP(totalXP: number): LevelDefinition {
    for (let i = LEVEL_DEFINITIONS.length - 1; i >= 0; i--) {
      if (totalXP >= LEVEL_DEFINITIONS[i].minXP) {
        return LEVEL_DEFINITIONS[i]
      }
    }
    return LEVEL_DEFINITIONS[0]
  }

  /**
   * Get reading statistics for dashboard
   */
  const readingStats = computed(() => {
    let storiesData: any[] = []
    if (typeof localStorage !== 'undefined') {
      storiesData = JSON.parse(localStorage.getItem('storiesData') || '[]')
    }
    const completeStories = getCompleteStories()
    const favorites = getFavoriteStories()

    // Calculate total reading time
    let totalReadingTime = 0
    storiesData.forEach((story: any) => {
      if (story.spentTime) {
        totalReadingTime += story.spentTime
      }
    })

    const readingTimeMinutes = Math.floor(totalReadingTime / 60)
    const readingTimeHours = Math.floor(readingTimeMinutes / 60)

    return {
      totalStoriesRead: completeStories.length,
      totalFavorites: favorites.length,
      totalReadingTime: `${readingTimeHours}h ${readingTimeMinutes % 60}m`,
      averagePerStory: completeStories.length > 0 ? Math.round(totalReadingTime / completeStories.length) : 0
    }
  })

  // Auto-load on initialization with retroactive XP for existing players
  loadPlayerProfile()
  initializeWithRetroactiveXP()

  return {
    // State
    playerProfile: readonly(playerProfile),

    // Computed
    nextLevelInfo: readonly(nextLevelInfo),
    readingStats: readonly(readingStats),

    // Methods
    loadPlayerProfile,
    savePlayerProfile,
    initializePlayerProfile,
    calculateStoryXP,
    addXP,
    getTitleForLevel,
    calculateRetroactiveXP,
    initializeWithRetroactiveXP,
    onStoryCompleted,
    getLevelFromXP
  }
}

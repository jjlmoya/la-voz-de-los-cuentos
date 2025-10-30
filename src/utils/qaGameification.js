/**
 * QA Script for Gamification System
 * Usage in browser console:
 *
 * // Add XP to player
 * window.qaGameification.addXP(500)
 *
 * // Set player to specific level
 * window.qaGameification.setLevel(10)
 *
 * // Add XP from completed stories
 * window.qaGameification.addXPFromStories()
 *
 * // Reset profile to level 1
 * window.qaGameification.resetProfile()
 *
 * // Get current profile
 * window.qaGameification.getProfile()
 *
 * // Set custom profile
 * window.qaGameification.setProfile({ level: 15, totalXP: 20000 })
 *
 * // List all stories in localStorage
 * window.qaGameification.listStories()
 */

const LEVEL_DEFINITIONS = [
  { level: 1, minXP: 0, maxXP: 1000 },
  { level: 2, minXP: 1000, maxXP: 2000 },
  { level: 3, minXP: 2000, maxXP: 3000 },
  { level: 4, minXP: 3000, maxXP: 4500 },
  { level: 5, minXP: 4500, maxXP: 6000 },
  { level: 6, minXP: 6000, maxXP: 7500 },
  { level: 7, minXP: 7500, maxXP: 9500 },
  { level: 8, minXP: 9500, maxXP: 11500 },
  { level: 9, minXP: 11500, maxXP: 13500 },
  { level: 10, minXP: 13500, maxXP: 15500 },
  { level: 11, minXP: 15500, maxXP: 17500 },
  { level: 12, minXP: 17500, maxXP: 19500 },
  { level: 13, minXP: 19500, maxXP: 21500 },
  { level: 14, minXP: 21500, maxXP: 23500 },
  { level: 15, minXP: 23500, maxXP: 25500 },
  { level: 16, minXP: 25500, maxXP: 27500 },
  { level: 17, minXP: 27500, maxXP: 29500 },
  { level: 18, minXP: 29500, maxXP: 31500 },
  { level: 19, minXP: 31500, maxXP: 33500 },
  { level: 20, minXP: 33500, maxXP: 40000 }
]

const XP_REWARDS = {
  completeStory: (durationMinutes) => 100 + Math.floor(durationMinutes / 10),
  favorite: 10,
  halfProgressReward: 50
}

/**
 * Load current profile from localStorage
 */
function loadProfile() {
  const stored = localStorage.getItem('playerProfile')
  if (stored) {
    return JSON.parse(stored)
  }
  return getDefaultProfile()
}

/**
 * Save profile to localStorage
 */
function saveProfile(profile) {
  localStorage.setItem('playerProfile', JSON.stringify(profile))
  console.log('✅ Profile saved:', profile)
}

/**
 * Get default profile
 */
function getDefaultProfile() {
  return {
    level: 1,
    totalXP: 0,
    currentLevelXP: 0,
    nextLevelXP: 1000,
    title: 'Aprendiz de Historias',
    titleKey: 'gamification.level.apprentice',
    avatar: 1,
    color: 'blue'
  }
}

/**
 * Calculate level from total XP
 */
function calculateLevelFromXP(totalXP) {
  for (let i = LEVEL_DEFINITIONS.length - 1; i >= 0; i--) {
    if (totalXP >= LEVEL_DEFINITIONS[i].minXP) {
      const levelDef = LEVEL_DEFINITIONS[i]
      const currentLevelXP = totalXP - levelDef.minXP
      const nextLevelDef = LEVEL_DEFINITIONS[i + 1] || levelDef
      const nextLevelXP = nextLevelDef.maxXP - levelDef.minXP

      const titles = {
        1: { key: 'gamification.level.apprentice', title: 'Aprendiz de Historias' },
        4: { key: 'gamification.level.adventurer', title: 'Lector Aventurero' },
        7: { key: 'gamification.level.explorer', title: 'Explorador de Mundos' },
        10: { key: 'gamification.level.guardian', title: 'Guardián de Sagas' },
        16: { key: 'gamification.level.master', title: 'Maestro de Cuentos' }
      }

      let titleKey = 'gamification.level.apprentice'
      let titleName = 'Aprendiz de Historias'
      let color = 'blue'

      if (levelDef.level >= 16) {
        titleKey = titles[16].key
        titleName = titles[16].title
        color = 'silver'
      } else if (levelDef.level >= 10) {
        titleKey = titles[10].key
        titleName = titles[10].title
        color = 'gold'
      } else if (levelDef.level >= 7) {
        titleKey = titles[7].key
        titleName = titles[7].title
        color = 'purple'
      } else if (levelDef.level >= 4) {
        titleKey = titles[4].key
        titleName = titles[4].title
        color = 'green'
      }

      return {
        level: levelDef.level,
        totalXP,
        currentLevelXP,
        nextLevelXP,
        title: titleName,
        titleKey,
        avatar: levelDef.level,
        color
      }
    }
  }
  return getDefaultProfile()
}

/**
 * Add XP to profile
 */
function addXP(amount) {
  const profile = loadProfile()
  profile.totalXP += amount
  const updated = calculateLevelFromXP(profile.totalXP)
  saveProfile(updated)
  console.log(`➕ Added ${amount} XP. New total: ${updated.totalXP} XP (Level ${updated.level})`)
  return updated
}

/**
 * Set player to specific level
 */
function setLevel(level) {
  if (level < 1 || level > 20) {
    console.error('❌ Level must be between 1 and 20')
    return
  }
  const levelDef = LEVEL_DEFINITIONS[level - 1]
  const newXP = levelDef.minXP + 100 // Give some XP into the level
  const profile = calculateLevelFromXP(newXP)
  saveProfile(profile)
  console.log(`⬆️  Set to level ${level}. XP: ${newXP}`)
  return profile
}

/**
 * Add XP from all completed stories
 */
function addXPFromStories() {
  const storiesData = JSON.parse(localStorage.getItem('storiesData') || '[]')
  const profile = loadProfile()

  let totalXP = 0
  let storyCount = 0

  storiesData.forEach((story) => {
    if (story && story.finished) {
      const storyXP = XP_REWARDS.completeStory(Math.ceil(story.totalTime / 60))
      totalXP += storyXP
      storyCount++

      // Add favorite bonus
      if (story.like) {
        totalXP += XP_REWARDS.favorite
      }

      // Add 50%+ progress bonus
      if (story.spentTime && story.totalTime) {
        const progress = (story.spentTime / story.totalTime) * 100
        if (progress >= 50) {
          totalXP += XP_REWARDS.halfProgressReward
        }
      }
    }
  })

  profile.totalXP += totalXP
  const updated = calculateLevelFromXP(profile.totalXP)
  saveProfile(updated)
  console.log(`📖 Added XP from ${storyCount} completed stories: +${totalXP} XP`)
  console.log(`   New Level: ${updated.level}, Total XP: ${updated.totalXP}`)
  return updated
}

/**
 * Reset profile to level 1
 */
function resetProfile() {
  const defaultProfile = getDefaultProfile()
  saveProfile(defaultProfile)
  console.log('🔄 Profile reset to Level 1')
  return defaultProfile
}

/**
 * Get current profile
 */
function getProfile() {
  const profile = loadProfile()
  console.log('📊 Current Profile:')
  console.table(profile)
  return profile
}

/**
 * Set custom profile
 */
function setProfile(customProfile) {
  const profile = loadProfile()
  const merged = { ...profile, ...customProfile }
  const updated = calculateLevelFromXP(merged.totalXP)
  saveProfile(updated)
  console.log('✏️  Profile updated:')
  console.table(updated)
  return updated
}

/**
 * List all stories in localStorage
 */
function listStories() {
  const storiesData = JSON.parse(localStorage.getItem('storiesData') || '[]')
  const completed = storiesData.filter(s => s && s.finished)
  const pending = storiesData.filter(s => s && !s.finished)

  console.log(`📚 Stories Summary:`)
  console.log(`   ✅ Completed: ${completed.length}`)
  console.log(`   ⏳ Pending: ${pending.length}`)
  console.log(`   Total: ${storiesData.length}`)
  console.log('')
  console.log('📖 Completed Stories:')
  console.table(
    completed.map(s => ({
      key: s.key,
      spent: `${Math.round(s.spentTime / 60)} min`,
      total: `${Math.ceil(s.totalTime / 60)} min`,
      progress: `${Math.round((s.spentTime / s.totalTime) * 100)}%`,
      favorite: s.like ? '❤️' : '🤍'
    }))
  )
  return { completed: completed.length, pending: pending.length, total: storiesData.length }
}

/**
 * Get XP needed for next level
 */
function getNextLevelInfo() {
  const profile = loadProfile()
  const nextLevelDef = LEVEL_DEFINITIONS[profile.level]
  if (!nextLevelDef) {
    console.log('🏆 You are at max level!')
    return null
  }
  const xpNeeded = nextLevelDef.minXP - profile.totalXP
  console.log(`📈 Next Level Info:`)
  console.log(`   Current: Level ${profile.level} (${profile.totalXP} XP)`)
  console.log(`   Next: Level ${profile.level + 1}`)
  console.log(`   XP Needed: ${xpNeeded} XP`)
  console.log(`   Progress: ${Math.round((profile.currentLevelXP / profile.nextLevelXP) * 100)}%`)
  return { currentLevel: profile.level, nextLevel: profile.level + 1, xpNeeded }
}

/**
 * Export all functions
 */
export const qaGameification = {
  addXP,
  setLevel,
  addXPFromStories,
  resetProfile,
  getProfile,
  setProfile,
  listStories,
  getNextLevelInfo
}

// Make available globally in browser console
if (typeof window !== 'undefined') {
  window.qaGameification = qaGameification
  console.log('✅ QA Gamification commands loaded. Type: window.qaGameification.help() for commands')
  console.log('   Available commands:')
  console.log('   - addXP(amount)')
  console.log('   - setLevel(1-20)')
  console.log('   - addXPFromStories()')
  console.log('   - resetProfile()')
  console.log('   - getProfile()')
  console.log('   - setProfile({...})')
  console.log('   - listStories()')
  console.log('   - getNextLevelInfo()')
}

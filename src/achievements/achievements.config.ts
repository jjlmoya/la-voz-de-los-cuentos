/**
 * Configuración centralizada de todos los logros del sistema
 *
 * ESTRUCTURA DE ILUSTRACIONES:
 * - public/assets/achievements/read/{numero}.png → Logros de lectura
 * - public/assets/achievements/fav/{numero}.png → Logros de favoritos
 * - public/assets/achievements/read-saga/{nombre}.png → Logros de sagas
 * - public/assets/achievements/read-character/{nombre}.png → Logros de personajes
 * - public/assets/achievements/read-special/{nombre}.png → Logros especiales
 */

import type { AchievementDefinition } from '../types/achievement'

/**
 * LOGROS DE LECTURA
 */
export const READ_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'read-1',
    type: 'read',
    nameKey: 'achievement.read-1.name',
    descriptionKey: 'achievement.read-1.description',
    iconId: '1',
    threshold: 1,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-5',
    type: 'read',
    nameKey: 'achievement.read-5.name',
    descriptionKey: 'achievement.read-5.description',
    iconId: '5',
    threshold: 5,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-25',
    type: 'read',
    nameKey: 'achievement.read-25.name',
    descriptionKey: 'achievement.read-25.description',
    iconId: '25',
    threshold: 25,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-50',
    type: 'read',
    nameKey: 'achievement.read-50.name',
    descriptionKey: 'achievement.read-50.description',
    iconId: '50',
    threshold: 50,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-100',
    type: 'read',
    nameKey: 'achievement.read-100.name',
    descriptionKey: 'achievement.read-100.description',
    iconId: '100',
    threshold: 100,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-200',
    type: 'read',
    nameKey: 'achievement.read-200.name',
    descriptionKey: 'achievement.read-200.description',
    iconId: '200',
    threshold: 200,
    metadata: {
      folder: 'read'
    }
  }
]

/**
 * LOGROS DE FAVORITOS
 */
export const FAVORITE_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'fav-1',
    type: 'favorite',
    nameKey: 'achievement.fav-1.name',
    descriptionKey: 'achievement.fav-1.description',
    iconId: '1',
    threshold: 1,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-5',
    type: 'favorite',
    nameKey: 'achievement.fav-5.name',
    descriptionKey: 'achievement.fav-5.description',
    iconId: '5',
    threshold: 5,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-10',
    type: 'favorite',
    nameKey: 'achievement.fav-10.name',
    descriptionKey: 'achievement.fav-10.description',
    iconId: '10',
    threshold: 10,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-25',
    type: 'favorite',
    nameKey: 'achievement.fav-25.name',
    descriptionKey: 'achievement.fav-25.description',
    iconId: '25',
    threshold: 25,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-50',
    type: 'favorite',
    nameKey: 'achievement.fav-50.name',
    descriptionKey: 'achievement.fav-50.description',
    iconId: '50',
    threshold: 50,
    metadata: {
      folder: 'fav'
    }
  }
]

/**
 * LOGROS DE SAGAS
 */
export const SAGA_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'saga-1',
    type: 'saga',
    nameKey: 'achievement.saga-1.name',
    descriptionKey: 'achievement.saga-1.description',
    iconId: '1',
    threshold: 1,
    metadata: {
      folder: 'read-saga'
    }
  },
  {
    id: 'saga-3',
    type: 'saga',
    nameKey: 'achievement.saga-3.name',
    descriptionKey: 'achievement.saga-3.description',
    iconId: '3',
    threshold: 3,
    metadata: {
      folder: 'read-saga'
    }
  },
  {
    id: 'saga-7',
    type: 'saga',
    nameKey: 'achievement.saga-7.name',
    descriptionKey: 'achievement.saga-7.description',
    iconId: '7',
    threshold: 7,
    metadata: {
      folder: 'read-saga'
    }
  },
  {
    id: 'saga-all',
    type: 'saga',
    nameKey: 'achievement.saga-all.name',
    descriptionKey: 'achievement.saga-all.description',
    iconId: 'all',
    threshold: 11,
    metadata: {
      folder: 'read-saga'
    }
  }
]

/**
 * LOGROS DE PERSONAJES
 */
export const CHARACTER_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'char-5',
    type: 'character',
    nameKey: 'achievement.char-5.name',
    descriptionKey: 'achievement.char-5.description',
    iconId: '5',
    threshold: 5,
    metadata: {
      folder: 'read-character'
    }
  },
  {
    id: 'char-10',
    type: 'character',
    nameKey: 'achievement.char-10.name',
    descriptionKey: 'achievement.char-10.description',
    iconId: '10',
    threshold: 10,
    metadata: {
      folder: 'read-character'
    }
  },
  {
    id: 'char-all',
    type: 'character',
    nameKey: 'achievement.char-all.name',
    descriptionKey: 'achievement.char-all.description',
    iconId: 'all',
    threshold: 20,
    metadata: {
      folder: 'read-character'
    }
  },
  {
    id: 'char-profiles',
    type: 'character',
    nameKey: 'achievement.char-profiles.name',
    descriptionKey: 'achievement.char-profiles.description',
    iconId: 'profiles',
    threshold: 25,
    metadata: {
      folder: 'read-character'
    }
  }
]

/**
 * LOGROS ESPECIALES
 */
export const SPECIAL_ACHIEVEMENTS: AchievementDefinition[] = [
  {
    id: 'special-all',
    type: 'special',
    nameKey: 'achievement.special-all.name',
    descriptionKey: 'achievement.special-all.description',
    iconId: 'all',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-epic',
    type: 'special',
    nameKey: 'achievement.special-epic.name',
    descriptionKey: 'achievement.special-epic.description',
    iconId: 'epic',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-quick',
    type: 'special',
    nameKey: 'achievement.special-quick.name',
    descriptionKey: 'achievement.special-quick.description',
    iconId: 'quick',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-oldest',
    type: 'special',
    nameKey: 'achievement.special-oldest.name',
    descriptionKey: 'achievement.special-oldest.description',
    iconId: 'oldest',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-newest',
    type: 'special',
    nameKey: 'achievement.special-newest.name',
    descriptionKey: 'achievement.special-newest.description',
    iconId: 'newest',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-early',
    type: 'special',
    nameKey: 'achievement.special-early.name',
    descriptionKey: 'achievement.special-early.description',
    iconId: 'early',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  },
  {
    id: 'special-night',
    type: 'special',
    nameKey: 'achievement.special-night.name',
    descriptionKey: 'achievement.special-night.description',
    iconId: 'night',
    threshold: 1,
    metadata: {
      folder: 'read-special'
    }
  }
]

/**
 * Todos los logros disponibles
 */
export const ALL_ACHIEVEMENT_DEFINITIONS = [
  ...READ_ACHIEVEMENTS,
  ...FAVORITE_ACHIEVEMENTS,
  ...SAGA_ACHIEVEMENTS,
  ...CHARACTER_ACHIEVEMENTS,
  ...SPECIAL_ACHIEVEMENTS
]

/**
 * Obtener la definición de un logro por ID
 */
export function getAchievementDefinition(id: string): AchievementDefinition | undefined {
  return ALL_ACHIEVEMENT_DEFINITIONS.find(def => def.id === id)
}

/**
 * Obtener todos los logros de un tipo específico
 */
export function getAchievementsByType(type: string): AchievementDefinition[] {
  return ALL_ACHIEVEMENT_DEFINITIONS.filter(def => def.type === type)
}

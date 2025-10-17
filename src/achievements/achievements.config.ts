/**
 * Configuración centralizada de todos los logros del sistema
 *
 * ESTRUCTURA DE ILUSTRACIONES:
 * - public/assets/achievements/read/{numero}.png → Logros de lectura
 * - public/assets/achievements/fav/{numero}.png → Logros de favoritos
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
 * Todos los logros disponibles
 */
export const ALL_ACHIEVEMENT_DEFINITIONS = [
  ...READ_ACHIEVEMENTS,
  ...FAVORITE_ACHIEVEMENTS
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

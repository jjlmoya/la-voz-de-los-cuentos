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
    nameEs: 'Tu Primer Cuento',
    nameEn: 'Your First Story',
    descriptionEs: 'Lee 1 cuento',
    descriptionEn: 'Read 1 story',
    iconId: '1',
    threshold: 1,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-5',
    type: 'read',
    nameEs: 'Cinco Historias Mágicas',
    nameEn: 'Five Magical Stories',
    descriptionEs: 'Lee 5 cuentos',
    descriptionEn: 'Read 5 stories',
    iconId: '5',
    threshold: 5,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-25',
    type: 'read',
    nameEs: 'Viajero de Veinticinco Mundos',
    nameEn: 'Traveler of Twenty-Five Worlds',
    descriptionEs: 'Lee 25 cuentos',
    descriptionEn: 'Read 25 stories',
    iconId: '25',
    threshold: 25,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-50',
    type: 'read',
    nameEs: 'Maestro de Cincuenta Aventuras',
    nameEn: 'Master of Fifty Adventures',
    descriptionEs: 'Lee 50 cuentos',
    descriptionEn: 'Read 50 stories',
    iconId: '50',
    threshold: 50,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-100',
    type: 'read',
    nameEs: 'Centenario de Historias',
    nameEn: 'Century of Stories',
    descriptionEs: 'Lee 100 cuentos',
    descriptionEn: 'Read 100 stories',
    iconId: '100',
    threshold: 100,
    metadata: {
      folder: 'read'
    }
  },
  {
    id: 'read-200',
    type: 'read',
    nameEs: 'Leyenda Inmortal de Doscientas Sagas',
    nameEn: 'Immortal Legend of Two Hundred Sagas',
    descriptionEs: 'Lee 200 cuentos',
    descriptionEn: 'Read 200 stories',
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
    nameEs: 'Tu Primer Amor',
    nameEn: 'Your First Love',
    descriptionEs: 'Marca 1 cuento como favorito',
    descriptionEn: 'Mark 1 story as favorite',
    iconId: '1',
    threshold: 1,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-5',
    type: 'favorite',
    nameEs: 'Cinco Favoritos',
    nameEn: 'Five Favorites',
    descriptionEs: 'Marca 5 cuentos como favoritos',
    descriptionEn: 'Mark 5 stories as favorites',
    iconId: '5',
    threshold: 5,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-10',
    type: 'favorite',
    nameEs: 'Coleccionista de Historias',
    nameEn: 'Story Collector',
    descriptionEs: 'Marca 10 cuentos como favoritos',
    descriptionEn: 'Mark 10 stories as favorites',
    iconId: '10',
    threshold: 10,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-25',
    type: 'favorite',
    nameEs: 'Guardián de Veinticinco Joyas',
    nameEn: 'Guardian of Twenty-Five Gems',
    descriptionEs: 'Marca 25 cuentos como favoritos',
    descriptionEn: 'Mark 25 stories as favorites',
    iconId: '25',
    threshold: 25,
    metadata: {
      folder: 'fav'
    }
  },
  {
    id: 'fav-50',
    type: 'favorite',
    nameEs: 'Biblioteca Personal de Cincuenta Tesoros',
    nameEn: 'Personal Library of Fifty Treasures',
    descriptionEs: 'Marca 50 cuentos como favoritos',
    descriptionEn: 'Mark 50 stories as favorites',
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

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
 * Todos los logros disponibles
 */
export const ALL_ACHIEVEMENT_DEFINITIONS = [
  ...READ_ACHIEVEMENTS
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

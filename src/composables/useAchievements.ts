import { ref, computed } from 'vue'
import useStories from './useStories'

interface Achievement {
  id: string
  type: 'trophy' | 'medal' | 'badge'
  nameEs: string
  nameEn: string
  descriptionEs: string
  descriptionEn: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  metadata?: Record<string, any>
}

export default function useAchievements() {
  const { getCompleteStories, getFavoriteStories } = useStories()

  // Trofeos por cantidad de cuentos leídos
  const readTrophies = computed(() => {
    const count = getCompleteStories().length
    return [
      {
        id: 'trophy-bronze',
        type: 'trophy',
        nameEs: 'Trofeo de Bronce',
        nameEn: 'Bronze Trophy',
        descriptionEs: '1-5 cuentos leídos',
        descriptionEn: '1-5 stories read',
        icon: 'trophy-bronze.webp',
        unlocked: count >= 1,
        threshold: 1
      },
      {
        id: 'trophy-silver',
        type: 'trophy',
        nameEs: 'Trofeo de Plata',
        nameEn: 'Silver Trophy',
        descriptionEs: '6-20 cuentos leídos',
        descriptionEn: '6-20 stories read',
        icon: 'trophy-silver.webp',
        unlocked: count >= 6,
        threshold: 6
      },
      {
        id: 'trophy-gold',
        type: 'trophy',
        nameEs: 'Trofeo de Oro',
        nameEn: 'Gold Trophy',
        descriptionEs: '21-50 cuentos leídos',
        descriptionEn: '21-50 stories read',
        icon: 'trophy-gold.webp',
        unlocked: count >= 21,
        threshold: 21
      },
      {
        id: 'trophy-diamond',
        type: 'trophy',
        nameEs: 'Trofeo de Diamante',
        nameEn: 'Diamond Trophy',
        descriptionEs: '51+ cuentos leídos',
        descriptionEn: '51+ stories read',
        icon: 'trophy-diamond.webp',
        unlocked: count >= 51,
        threshold: 51
      }
    ]
  })

  // Medallas especiales
  const specialMedals = computed(() => {
    const readCount = getCompleteStories().length
    const favoriteCount = getFavoriteStories().length

    return [
      {
        id: 'medal-novice',
        type: 'medal',
        nameEs: 'Estrella de Novato',
        nameEn: 'Novice Star',
        descriptionEs: 'Lee tu primer cuento',
        descriptionEn: 'Read your first story',
        icon: 'medal-novice.webp',
        unlocked: readCount >= 1
      },
      {
        id: 'medal-golden-heart',
        type: 'medal',
        nameEs: 'Corazón Dorado',
        nameEn: 'Golden Heart',
        descriptionEs: '10 favoritos',
        descriptionEn: '10 favorites',
        icon: 'medal-golden-heart.webp',
        unlocked: favoriteCount >= 10
      },
      {
        id: 'medal-master-clock',
        type: 'medal',
        nameEs: 'Reloj Maestro',
        nameEn: 'Master Clock',
        descriptionEs: '100 horas de lectura',
        descriptionEn: '100 hours reading',
        icon: 'medal-master-clock.webp',
        unlocked: false // Esto se calcularía con datos reales de tiempo
      }
    ]
  })

  // Badges por categoría (si existe data de categorías)
  const categoryBadges = computed(() => {
    return [
      {
        id: 'badge-adventurer',
        type: 'badge',
        nameEs: 'Aventurero',
        nameEn: 'Adventurer',
        descriptionEs: 'Lee historias de aventura',
        descriptionEn: 'Read adventure stories',
        icon: 'badge-adventurer.webp',
        unlocked: false
      },
      {
        id: 'badge-magical',
        type: 'badge',
        nameEs: 'Mágico',
        nameEn: 'Magical',
        descriptionEs: 'Lee historias mágicas',
        descriptionEn: 'Read magical stories',
        icon: 'badge-magical.webp',
        unlocked: false
      },
      {
        id: 'badge-scientist',
        type: 'badge',
        nameEs: 'Científico',
        nameEn: 'Scientist',
        descriptionEs: 'Lee historias científicas',
        descriptionEn: 'Read science stories',
        icon: 'badge-scientist.webp',
        unlocked: false
      }
    ]
  })

  const allAchievements = computed(() => [
    ...readTrophies.value,
    ...specialMedals.value,
    ...categoryBadges.value
  ])

  const unlockedAchievements = computed(() =>
    allAchievements.value.filter(a => a.unlocked)
  )

  const lockedAchievements = computed(() =>
    allAchievements.value.filter(a => !a.unlocked)
  )

  const getAchievementProgress = (achievementId: string) => {
    const achievement = allAchievements.value.find(a => a.id === achievementId)
    if (!achievement) return null

    if (achievement.id === 'medal-golden-heart') {
      return {
        current: getFavoriteStories().length,
        target: 10
      }
    }

    if (achievement.id.startsWith('trophy-')) {
      return {
        current: getCompleteStories().length,
        target: achievement.threshold || 1
      }
    }

    return null
  }

  return {
    allAchievements,
    readTrophies,
    specialMedals,
    categoryBadges,
    unlockedAchievements,
    lockedAchievements,
    getAchievementProgress
  }
}

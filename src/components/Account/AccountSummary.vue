<template>
  <div class="account-summary">
    <div class="account-summary__grid">
      <a :href="toAccountRead()" class="account-summary__card account-summary__card--read">
        <div class="account-summary__card-icon">
          <img src="/assets/account/read.webp" alt="Read" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ readCount }}</div>
        <div class="account-summary__card-label">
          {{ props.lang === 'es' ? 'Leídos' : 'Read' }}
        </div>
      </a>

      <a :href="toAccountPending()" class="account-summary__card account-summary__card--pending">
        <div class="account-summary__card-icon">
          <img src="/assets/account/pending.webp" alt="Pending" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ pendingCount }}</div>
        <div class="account-summary__card-label">
          {{ props.lang === 'es' ? 'Pendientes' : 'Pending' }}
        </div>
      </a>

      <a :href="toAccountFavorites()" class="account-summary__card account-summary__card--favorites">
        <div class="account-summary__card-icon">
          <img src="/assets/account/favorites.webp" alt="Favorites" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ favoriteCount }}</div>
        <div class="account-summary__card-label">
          {{ props.lang === 'es' ? 'Favoritos' : 'Favorites' }}
        </div>
      </a>

      <a :href="toAccountAchievements()" class="account-summary__card account-summary__card--achievements">
        <div class="account-summary__card-icon">
          <img src="/assets/account/achievements.webp" alt="Achievements" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ achievementCount }}</div>
        <div class="account-summary__card-label">
          {{ props.lang === 'es' ? 'Logros' : 'Achievements' }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { computed, ref, onMounted } from 'vue'
  import { VText } from '@overgaming/vicius'
  import useStories from '../../composables/useStories'
  import useAchievements from '../../composables/useAchievements'
  import { toAccountRead, toAccountPending, toAccountFavorites, toAccountAchievements } from '../../router'

  const props = defineProps({
    lang: {
      type: String,
      default: 'es'
    }
  })

  const { getAllStories } = useStories()
  const { unlockedAchievements } = useAchievements()

  const readCount = ref(0)
  const pendingCount = ref(0)
  const favoriteCount = ref(0)

  onMounted(() => {
    if (typeof localStorage === 'undefined') return

    try {
      const storiesData = localStorage.getItem('storiesData')
      const allStories = getAllStories()

      if (!storiesData) {
        pendingCount.value = allStories.length
        return
      }

      const parsedData = JSON.parse(storiesData)
      if (!Array.isArray(parsedData)) {
        pendingCount.value = allStories.length
        return
      }

      const completedKeys = new Set(
        parsedData
          .filter(entry => entry.finished === true)
          .map(entry => entry.key)
      )
      readCount.value = allStories.filter(story => completedKeys.has(story.key)).length

      const pendingKeys = new Set(
        parsedData
          .filter(entry => entry.finished !== true)
          .map(entry => entry.key)
      )
      const storiesInStorage = new Set(parsedData.map(entry => entry.key))
      pendingCount.value = allStories.filter(story =>
        pendingKeys.has(story.key) || !storiesInStorage.has(story.key)
      ).length

      const favoriteKeys = parsedData
        .filter(entry => entry.like === true)
        .map(entry => entry.key)
      favoriteCount.value = allStories.filter(story => favoriteKeys.includes(story.key)).length
    } catch (error) {
      console.error('Error al calcular resúmenes de cuenta:', error)
    }
  })

  const achievementCount = computed(() => unlockedAchievements.value.length)
</script>

<style scoped>
  .account-summary {
    padding: var(--v-unit-8);
  }

  .account-summary__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: var(--v-unit-6);
    margin: 0 auto;
    max-width: 800px;
  }

  .account-summary__card {
    display: grid;
    grid-gap: var(--v-unit-3);
    padding: var(--v-unit-6);
    background: linear-gradient(135deg, var(--v-color-surface-high), var(--v-color-surface));
    border: 2px solid var(--v-color-accent-primary);
    border-radius: var(--v-radius-lg);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    align-items: center;
    justify-items: center;
    min-height: 200px;
  }

  .account-summary__card:hover,
  .account-summary__card:active {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--v-color-primary);
  }

  .account-summary__card--read {
    border-color: #4CAF50;
    background: linear-gradient(135deg, rgba(76, 175, 80, 0.1), rgba(76, 175, 80, 0.05));
  }

  .account-summary__card--pending {
    border-color: #FF9800;
    background: linear-gradient(135deg, rgba(255, 152, 0, 0.1), rgba(255, 152, 0, 0.05));
  }

  .account-summary__card--favorites {
    border-color: #E91E63;
    background: linear-gradient(135deg, rgba(233, 30, 99, 0.1), rgba(233, 30, 99, 0.05));
  }

  .account-summary__card--achievements {
    border-color: #FFC107;
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05));
  }

  .account-summary__card-icon {
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: float 3s ease-in-out infinite;
  }

  .account-summary__icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .account-summary__card:nth-child(1) .account-summary__card-icon {
    animation-delay: 0s;
  }

  .account-summary__card:nth-child(2) .account-summary__card-icon {
    animation-delay: 0.2s;
  }

  .account-summary__card:nth-child(3) .account-summary__card-icon {
    animation-delay: 0.4s;
  }

  .account-summary__card:nth-child(4) .account-summary__card-icon {
    animation-delay: 0.6s;
  }

  .account-summary__card-number {
    font-size: 48px;
    font-weight: bold;
    color: var(--v-color-primary);
  }

  .account-summary__card-label {
    font-size: 16px;
    font-weight: 600;
    color: var(--v-color-text-high);
    text-align: center;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-16px);
    }
  }

  @media (max-width: 640px) {
    .account-summary {
      padding: var(--v-unit-4);
    }

    .account-summary__grid {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: var(--v-unit-4);
    }

    .account-summary__card {
      min-height: 160px;
      padding: var(--v-unit-4);
    }

    .account-summary__card-icon {
      width: 48px;
      height: 48px;
    }

    .account-summary__card-number {
      font-size: 36px;
    }

    .account-summary__card-label {
      font-size: 14px;
    }
  }
</style>

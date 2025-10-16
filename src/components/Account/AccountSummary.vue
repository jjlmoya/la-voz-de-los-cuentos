<template>
  <div class="account-summary">
    <div class="account-summary__title">
      <VText as="h1" variant="header">{{ lang === 'es' ? 'Mi Cuenta' : 'My Account' }}</VText>
    </div>

    <nav class="account-summary__nav">
      <a
        :href="toAccountRead()"
        class="account-summary__nav-link"
      >
        <VText class="account-summary__nav-text">{{ lang === 'es' ? 'Leídos' : 'Read' }}</VText>
      </a>
      <a
        :href="toAccountPending()"
        class="account-summary__nav-link"
      >
        <VText class="account-summary__nav-text">{{ lang === 'es' ? 'Pendientes' : 'Pending' }}</VText>
      </a>
      <a
        :href="toAccountFavorites()"
        class="account-summary__nav-link"
      >
        <VText class="account-summary__nav-text">{{ lang === 'es' ? 'Favoritos' : 'Favorites' }}</VText>
      </a>
      <a
        :href="toAccountAchievements()"
        class="account-summary__nav-link"
      >
        <VText class="account-summary__nav-text">{{ lang === 'es' ? 'Logros' : 'Achievements' }}</VText>
      </a>
    </nav>

    <div class="account-summary__grid">
      <a :href="toAccountRead()" class="account-summary__card account-summary__card--read">
        <div class="account-summary__card-icon">
          <img src="/assets/account/read.webp" alt="Read" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ readCount }}</div>
        <div class="account-summary__card-label">
          {{ lang === 'es' ? 'Leídos' : 'Read' }}
        </div>
      </a>

      <a :href="toAccountPending()" class="account-summary__card account-summary__card--pending">
        <div class="account-summary__card-icon">
          <img src="/assets/account/pending.webp" alt="Pending" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ pendingCount }}</div>
        <div class="account-summary__card-label">
          {{ lang === 'es' ? 'Pendientes' : 'Pending' }}
        </div>
      </a>

      <a :href="toAccountFavorites()" class="account-summary__card account-summary__card--favorites">
        <div class="account-summary__card-icon">
          <img src="/assets/account/favorites.webp" alt="Favorites" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ favoriteCount }}</div>
        <div class="account-summary__card-label">
          {{ lang === 'es' ? 'Favoritos' : 'Favorites' }}
        </div>
      </a>

      <a :href="toAccountAchievements()" class="account-summary__card account-summary__card--achievements">
        <div class="account-summary__card-icon">
          <img src="/assets/account/achievements.webp" alt="Achievements" class="account-summary__icon-image" />
        </div>
        <div class="account-summary__card-number">{{ achievementCount }}</div>
        <div class="account-summary__card-label">
          {{ lang === 'es' ? 'Logros' : 'Achievements' }}
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import { VText } from '@overgaming/vicius'
  import useStories from '../../composables/useStories'
  import { toAccountRead, toAccountPending, toAccountFavorites, toAccountAchievements } from '../../router'

  const lang = computed(() => {
    if (typeof window !== 'undefined') {
      return import.meta.env.PUBLIC_LANG || 'es'
    }
    return 'es'
  })

  const { getCompleteStories, getPendingStories, getFavoriteStories } = useStories()

  const readCount = computed(() => getCompleteStories().length)
  const pendingCount = computed(() => getPendingStories().length)
  const favoriteCount = computed(() => getFavoriteStories().length)
  const achievementCount = computed(() => 0) // To be implemented
</script>

<style scoped>
  .account-summary {
    padding: var(--v-unit-8);
  }

  .account-summary__title {
    text-align: center;
    margin-bottom: var(--v-unit-6);
  }

  .account-summary__nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-gap: var(--v-unit-3);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface);
    border-radius: var(--v-radius-lg);
    margin-bottom: var(--v-unit-8);
  }

  .account-summary__nav-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--v-unit-3) var(--v-unit-4);
    background-color: var(--v-color-surface-high);
    border-radius: var(--v-radius-md);
    border: 2px solid transparent;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .account-summary__nav-link:active,
  .account-summary__nav-link:focus {
    border-color: var(--v-color-accent-primary);
  }

  .account-summary__nav-text {
    margin: 0;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
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

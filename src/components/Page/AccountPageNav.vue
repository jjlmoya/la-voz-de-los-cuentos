<template>
  <VContainer size="xl" class="account-page">
    <div class="account-page__content">
      <!-- Header con botón de volver y título -->
      <div class="account-page__header">
        <a :href="toAccountHome()" class="account-page__back-button" :title="t('account.backToHome')">
          <span class="account-page__back-icon">←</span>
        </a>
        <div class="account-page__title">
          <h1 class="account-page__title-main">{{ t('page.account.h1') }}</h1>
          <p class="account-page__title-subtitle">{{ t('page.account.resume.subtitle') }}</p>
        </div>
      </div>

      <!-- Navegación visual con iconos -->
      <nav class="account-page__nav">
        <a
          v-for="tab in tabs"
          :key="tab.id"
          :href="tab.href"
          class="account-page__nav-card"
          :class="[
            `account-page__nav-card--${tab.id}`,
            { 'account-page__nav-card--active': isActive(tab.id) }
          ]"
          :title="tab.label"
        >
          <div class="account-page__nav-card-icon">
            <img :src="tab.icon" :alt="tab.label" class="account-page__nav-card-image" />
          </div>
          <span class="account-page__nav-card-label">{{ tab.label }}</span>
        </a>
      </nav>

      <slot />
    </div>
  </VContainer>
</template>

<script setup>
  import { computed } from 'vue'
  import t from '../../translations'
  import { VText, VContainer } from '@overgaming/vicius'
  import { toAccountRead, toAccountPending, toAccountFavorites, toAccountAchievements, toAccount } from '../../router'

  const props = defineProps({
    activeTab: {
      type: String,
      default: 'read'
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const toAccountHome = () => toAccount()

  const tabs = computed(() => {
    const basicTabs = [
      {
        id: 'read',
        label: props.lang === 'es' ? 'Leídos' : 'Read',
        href: toAccountRead(),
        icon: '/assets/account/read.webp'
      },
      {
        id: 'pending',
        label: props.lang === 'es' ? 'Pendientes' : 'Pending',
        href: toAccountPending(),
        icon: '/assets/account/pending.webp'
      },
      {
        id: 'favorites',
        label: props.lang === 'es' ? 'Favoritos' : 'Favorites',
        href: toAccountFavorites(),
        icon: '/assets/account/favorites.webp'
      },
      {
        id: 'achievements',
        label: props.lang === 'es' ? 'Logros' : 'Achievements',
        href: toAccountAchievements(),
        icon: '/assets/account/achievements.webp'
      }
    ]

    // Only show tabs for non-summary pages
    return props.activeTab === 'summary' ? [] : basicTabs
  })

  const isActive = (tabId) => props.activeTab === tabId
</script>

<style scoped>
  .account-page {
    min-height: 70vh;
    padding: var(--v-unit-8);
  }

  .account-page__content {
    display: grid;
    grid-gap: var(--v-unit-6);
  }

  /* Header con botón de volver */
  .account-page__header {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: var(--v-unit-4);
  }

  .account-page__back-button {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--v-color-accent-primary), var(--v-color-accent-primary-hover));
    border: 2px solid var(--v-color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .account-page__back-button:hover {
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  .account-page__back-button:active {
    transform: translateY(-50%) scale(0.95);
  }

  .account-page__back-icon {
    font-size: 24px;
    color: white;
    font-weight: 700;
  }

  /* Título */
  .account-page__title {
    text-align: center;
    padding: 0 60px;
  }

  .account-page__title-main {
    margin: 0;
    font-size: 40px;
    font-weight: 700;
    color: var(--v-color-primary);
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    animation: slideInDown 0.6s ease-out;
  }

  .account-page__title-subtitle {
    margin: var(--v-unit-2) 0 0 0;
    font-size: var(--v-font-size-md);
    color: var(--v-color-text-medium);
    font-weight: 500;
  }

  /* Navegación con tarjetas visuales */
  .account-page__nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    grid-gap: var(--v-unit-4);
    padding: var(--v-unit-6);
    background: linear-gradient(135deg, rgba(255, 193, 7, 0.05), rgba(33, 150, 243, 0.05));
    border-radius: var(--v-radius-xl);
    border: 2px dashed rgba(0, 0, 0, 0.1);
  }

  .account-page__nav-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--v-unit-3);
    padding: var(--v-unit-4);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6));
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: var(--v-radius-lg);
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: hidden;
  }

  .account-page__nav-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.5));
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .account-page__nav-card:hover {
    transform: translateY(-8px) scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    border-color: var(--v-color-primary);
  }

  .account-page__nav-card:hover::before {
    opacity: 1;
  }

  .account-page__nav-card-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--v-radius-lg);
    background: rgba(0, 0, 0, 0.03);
    animation: bounce 2s ease-in-out infinite;
  }

  .account-page__nav-card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .account-page__nav-card-label {
    font-size: var(--v-font-size-md);
    font-weight: 700;
    color: var(--v-color-text-high);
    text-align: center;
    transition: color 0.3s ease;
  }

  /* Estados por tipo de tarjeta */
  .account-page__nav-card--read {
    border-color: #4CAF50;
  }

  .account-page__nav-card--pending {
    border-color: #FF9800;
  }

  .account-page__nav-card--favorites {
    border-color: #E91E63;
  }

  .account-page__nav-card--achievements {
    border-color: #FFC107;
  }

  /* Tarjeta activa */
  .account-page__nav-card--active {
    background: linear-gradient(135deg, var(--v-color-primary), var(--v-color-accent-primary));
    border-color: var(--v-color-primary);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  .account-page__nav-card--active .account-page__nav-card-label {
    color: white;
  }

  .account-page__nav-card--active .account-page__nav-card-icon {
    background: rgba(255, 255, 255, 0.2);
  }

  /* Animaciones */
  @keyframes slideInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-4px);
    }
  }

  /* Mobile */
  @media (max-width: 640px) {
    .account-page {
      padding: var(--v-unit-4);
    }

    .account-page__header {
      margin-bottom: var(--v-unit-3);
    }

    .account-page__title {
      padding: 0 50px;
    }

    .account-page__title-main {
      font-size: 28px;
    }

    .account-page__back-button {
      width: 40px;
      height: 40px;
    }

    .account-page__back-icon {
      font-size: 20px;
    }

    .account-page__nav {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: var(--v-unit-3);
      padding: var(--v-unit-4);
      border-radius: var(--v-radius-lg);
    }

    .account-page__nav-card {
      padding: var(--v-unit-3);
      gap: var(--v-unit-2);
    }

    .account-page__nav-card-icon {
      width: 60px;
      height: 60px;
    }

    .account-page__nav-card-label {
      font-size: var(--v-font-size-sm);
    }

    .account-page__nav-card:hover {
      transform: translateY(-4px) scale(1.02);
    }
  }
</style>

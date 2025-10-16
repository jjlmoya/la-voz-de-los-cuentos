<template>
  <VContainer size="xl" class="account-page">
    <div class="account-page__content">
      <div class="account-page__title">
        <VText as="h1" variant="header">{{ t('page.account.h1') }}</VText>
      </div>

      <nav class="account-page__nav">
        <a
          v-for="tab in tabs"
          :key="tab.id"
          :href="tab.href"
          class="account-page__nav-link"
          :class="{ 'account-page__nav-link--active': isActive(tab.id) }"
        >
          <VText class="account-page__nav-text">{{ tab.label }}</VText>
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
  import { toAccountRead, toAccountPending, toAccountFavorites, toAccountAchievements } from '../../router'

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

  const tabs = computed(() => {
    const basicTabs = [
      {
        id: 'read',
        label: props.lang === 'es' ? 'Leídos' : 'Read',
        href: toAccountRead()
      },
      {
        id: 'pending',
        label: props.lang === 'es' ? 'Pendientes' : 'Pending',
        href: toAccountPending()
      },
      {
        id: 'favorites',
        label: props.lang === 'es' ? 'Favoritos' : 'Favorites',
        href: toAccountFavorites()
      },
      {
        id: 'achievements',
        label: props.lang === 'es' ? 'Logros' : 'Achievements',
        href: toAccountAchievements()
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

  .account-page__title {
    font-size: 24px;
    text-align: center;
  }

  .account-page__nav {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    grid-gap: var(--v-unit-3);
    padding: var(--v-unit-4);
    background-color: var(--v-color-surface);
    border-radius: var(--v-radius-lg);
  }

  .account-page__nav-link {
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

  .account-page__nav-link:active,
  .account-page__nav-link:focus {
    border-color: var(--v-color-accent-primary);
  }

  .account-page__nav-link--active {
    background-color: var(--v-color-primary);
    border-color: var(--v-color-primary);
  }

  .account-page__nav-text {
    margin: 0;
    font-weight: 600;
    text-decoration: none;
    color: inherit;
  }

  .account-page__nav-link--active .account-page__nav-text {
    color: var(--v-color-surface);
  }

  @media (max-width: 640px) {
    .account-page {
      padding: var(--v-unit-4);
    }

    .account-page__nav {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: var(--v-unit-2);
      padding: var(--v-unit-3);
    }

    .account-page__nav-link {
      padding: var(--v-unit-2) var(--v-unit-3);
      font-size: 14px;
    }
  }
</style>

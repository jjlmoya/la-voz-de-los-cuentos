<template>
  <div class="account-pending-section">
    <StoriesSection :stories="stories">
      <template v-if="stories.length === 0" #fallback>
        <div class="account-pending-empty">
          <img
            src="/assets/account/empty-states/pending-empty.webp"
            alt="All caught up"
            class="account-pending-empty__image"
          />
          <p class="account-pending-empty__text">{{ t('page.account.pending.empty') }}</p>
          <p class="account-pending-empty__hint">{{ t('page.account.pending.hint') }}</p>
        </div>
      </template>
    </StoriesSection>
  </div>
</template>

<script setup>
  import StoriesSection from '../Sections/StoriesSection.vue'
  import t from '../../translations'

  defineProps({
    stories: {
      type: Array,
      default: () => []
    }
  })
</script>

<style scoped>
  .account-pending-section {
    padding: var(--v-unit-8);
  }

  .account-pending-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    gap: var(--v-unit-4);
  }

  .account-pending-empty__image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    opacity: 0.9;
    animation: fadeInScale 0.6s ease-out;
  }

  .account-pending-empty__text {
    margin: 0;
    font-size: var(--v-font-size-xl);
    font-weight: 600;
    color: var(--v-color-text-high);
  }

  .account-pending-empty__hint {
    margin: 0;
    font-size: var(--v-font-size-md);
    color: var(--v-color-text-medium);
    max-width: 300px;
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 0.9;
      transform: scale(1);
    }
  }

  @media (max-width: 640px) {
    .account-pending-section {
      padding: var(--v-unit-4);
    }

    .account-pending-empty {
      min-height: 300px;
      gap: var(--v-unit-3);
    }

    .account-pending-empty__image {
      width: 150px;
      height: 150px;
    }

    .account-pending-empty__text {
      font-size: var(--v-font-size-lg);
    }

    .account-pending-empty__hint {
      font-size: var(--v-font-size-sm);
    }
  }
</style>

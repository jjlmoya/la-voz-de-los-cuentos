<template>
  <div class="account-favorites-section">
    <StoriesSection :stories="clientStories">
      <template v-if="clientStories.length === 0" #fallback>
        <div class="account-favorites-empty">
          <img
            src="/assets/account/empty-states/favorites-empty.webp"
            alt="No favorites"
            class="account-favorites-empty__image"
          />
          <p class="account-favorites-empty__text">{{ t('page.account.favorites.empty') }}</p>
          <p class="account-favorites-empty__hint">{{ t('page.account.favorites.hint') }}</p>
        </div>
      </template>
    </StoriesSection>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import useStories from '../../composables/useStories'
  import t from '../../translations'

  defineProps({
    stories: {
      type: Array,
      default: () => []
    }
  })

  const clientStories = ref([])

  onMounted(() => {
    const { getFavoriteStories } = useStories()
    clientStories.value = getFavoriteStories()
  })
</script>

<style scoped>
  .account-favorites-section {
    padding: var(--v-unit-8);
  }

  .account-favorites-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;
    gap: var(--v-unit-4);
  }

  .account-favorites-empty__image {
    width: 200px;
    height: 200px;
    object-fit: contain;
    opacity: 0.9;
    animation: fadeInScale 0.6s ease-out;
  }

  .account-favorites-empty__text {
    margin: 0;
    font-size: var(--v-font-size-xl);
    font-weight: 600;
    color: var(--v-color-text-high);
  }

  .account-favorites-empty__hint {
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
    .account-favorites-section {
      padding: var(--v-unit-4);
    }

    .account-favorites-empty {
      min-height: 300px;
      gap: var(--v-unit-3);
    }

    .account-favorites-empty__image {
      width: 150px;
      height: 150px;
    }

    .account-favorites-empty__text {
      font-size: var(--v-font-size-lg);
    }

    .account-favorites-empty__hint {
      font-size: var(--v-font-size-sm);
    }
  }
</style>

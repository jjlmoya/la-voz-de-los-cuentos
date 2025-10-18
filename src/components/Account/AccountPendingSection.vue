<template>
  <div class="account-pending-section">
    <StoriesSection :stories="clientStories">
      <template v-if="clientStories.length === 0" #fallback>
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
  import { ref, onMounted } from 'vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import t from '../../translations'

  const props = defineProps({
    stories: {
      type: Array,
      default: () => []
    },
    sectionType: {
      type: String,
      default: 'pending'
    }
  })

  const clientStories = ref([])

  onMounted(() => {
    if (typeof localStorage === 'undefined') return

    try {
      const storiesData = localStorage.getItem('storiesData')
      if (!storiesData) {
        clientStories.value = props.stories
        return
      }

      const parsedData = JSON.parse(storiesData)
      if (!Array.isArray(parsedData)) {
        clientStories.value = props.stories
        return
      }

      const pendingKeys = new Set(
        parsedData
          .filter(entry => entry && entry.finished !== true)
          .map(entry => entry.key)
      )

      const storiesInStorage = new Set(parsedData.filter(entry => entry).map(entry => entry.key))
      clientStories.value = props.stories.filter(story =>
        pendingKeys.has(story.key) || !storiesInStorage.has(story.key)
      )
    } catch (error) {
      console.error('Error al filtrar cuentos pendientes:', error)
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

<template>
  <div class="account-read-section">
    <div v-if="clientStories.length > 0" class="stories-card">
      <StoriesSection :stories="clientStories" />
    </div>
    <!-- Tutorial siempre visible abajo (independientemente de si hay cuentos leídos o no) -->
    <div class="tutorial-section">
      <TutorialProgress />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import StoriesSection from '../Sections/StoriesSection.vue'
  import TutorialProgress from '../Tutorial/Progress.vue'

  const props = defineProps({
    stories: {
      type: Array,
      default: () => []
    },
    sectionType: {
      type: String,
      default: 'read'
    }
  })

  const clientStories = ref([])

  onMounted(() => {
    if (typeof localStorage === 'undefined') return

    try {
      const storiesData = localStorage.getItem('storiesData')
      if (!storiesData) return

      const parsedData = JSON.parse(storiesData)
      if (!Array.isArray(parsedData)) return

      const completedKeys = new Set(
        parsedData
          .filter(entry => entry && entry.finished === true)
          .map(entry => entry.key)
      )

      clientStories.value = props.stories.filter(story => completedKeys.has(story.key))
    } catch (error) {
      console.error('Error al filtrar cuentos leídos:', error)
    }
  })
</script>

<style scoped>
  .account-read-section {
    padding: var(--v-unit-8);
  }

  .stories-card {
    background-color: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: var(--v-radius-8, 8px);
    padding: var(--v-unit-8);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    margin-bottom: var(--v-unit-8);
  }

  .tutorial-section {
    background-color: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: var(--v-radius-8, 8px);
    padding: var(--v-unit-8);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 640px) {
    .account-read-section {
      padding: var(--v-unit-4);
    }

    .stories-card {
      padding: var(--v-unit-4);
      margin-bottom: var(--v-unit-4);
    }

    .tutorial-section {
      padding: var(--v-unit-4);
    }
  }
</style>

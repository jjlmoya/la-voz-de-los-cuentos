<template>
  <div class="account-read-section">
    <StoriesSection :stories="clientStories">
      <template #fallback>
        <TutorialProgress />
      </template>
    </StoriesSection>
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
          .filter(entry => entry.finished === true)
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

  .tutorial-section {
    margin-top: var(--v-unit-8);
    padding-top: var(--v-unit-8);
    border-top: 1px solid var(--color-border, #e0e0e0);
  }

  @media (max-width: 640px) {
    .account-read-section {
      padding: var(--v-unit-4);
    }

    .tutorial-section {
      margin-top: var(--v-unit-4);
      padding-top: var(--v-unit-4);
    }
  }
</style>

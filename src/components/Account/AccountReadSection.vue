<template>
  <div class="account-read-section">
    <StoriesSection :stories="stories">
      <template v-if="showTutorial" #fallback>
        <TutorialProgress />
      </template>
    </StoriesSection>
  </div>
</template>

<script setup>
  import StoriesSection from '../Sections/StoriesSection.vue'
  import TutorialProgress from '../Tutorial/Progress.vue'

  defineProps({
    stories: {
      type: Array,
      default: () => []
    },
    showTutorial: {
      type: Boolean,
      default: false
    }
  })
</script>

<style scoped>
  .account-read-section {
    padding: var(--v-unit-8);
  }

  @media (max-width: 640px) {
    .account-read-section {
      padding: var(--v-unit-4);
    }
  }
</style>

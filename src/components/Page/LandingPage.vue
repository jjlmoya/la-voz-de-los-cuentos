<template>
  <div class="landing-page">
    <!-- Story Carousel Hero Section -->
    <StoryCarouselHero
      :title="landing.title"
      :lang="currentLang"
      :itemCount="20"
    />

  </div>
</template>

<script setup>
  import StoryCarouselHero from '../Landing/StoryCarouselHero.vue'

  const props = defineProps({
    landing: {
      type: Object,
      default: () => ({})
    }
  })

  const currentLang = import.meta.env.PUBLIC_LANG || 'es'
</script>

<style scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
  }
</style>

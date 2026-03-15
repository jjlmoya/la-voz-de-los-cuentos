<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <LandingHero
      :title="landing.title"
      :keyword="landing.keyword"
    />

    <!-- Dynamic Content Blocks (alternating text + stories) -->
    <LandingContent
      :content="contentBlocks"
      :landing="landing"
      :lang="currentLang"
    />
  </div>
</template>

<script setup>
  import { computed } from 'vue'
  import useLanding from '../../composables/useLanding'
  import LandingHero from '../Landing/LandingHero.vue'
  import LandingContent from '../Landing/LandingContent.vue'

  const props = defineProps({
    landing: {
      type: Object,
      default: () => ({})
    }
  })

  const currentLang = import.meta.env.PUBLIC_LANG || 'es'

  const contentBlocks = computed(() => {
    const { getContentBlocks } = useLanding(props.landing, currentLang)
    return getContentBlocks()
  })
</script>

<style scoped>
  .landing-page {
    display: flex;
    flex-direction: column;
    gap: var(--v-unit-8);
  }

  .landing-page__stories-wrapper {
    max-width: 1400px;
    margin: 0 auto;
    width: 100%;
    padding: 0 var(--v-unit-4);
  }

  .landing-page__stories-title {
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    font-weight: 700;
    color: var(--v-color-text);
    text-align: center;
    margin: var(--v-unit-4) 0 var(--v-unit-6) 0;
  }

  @media (max-width: 768px) {
    .landing-page {
      gap: var(--v-unit-6);
    }

    .landing-page__stories-wrapper {
      padding: 0 var(--v-unit-3);
    }
  }
</style>

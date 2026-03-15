<template>
  <div class="landing-content">
    <component
      v-for="(block, index) in content"
      :key="index"
      :is="getComponent(block.type)"
      :block="block"
      :landing="landing"
      :lang="lang"
    />
  </div>
</template>

<script setup>
  import BlogText from '../BlogComponents/BlogText.vue'
  import StoryRecommendation from '../BlogComponents/StoryRecommendation.vue'
  import StoriesGallery from './StoriesGallery.vue'
  import StoryHighlight from './StoryHighlight.vue'

  defineProps({
    content: {
      type: Array,
      required: true
    },
    landing: {
      type: Object,
      required: false
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const components = {
    text: BlogText,
    story_recommendation: StoryRecommendation,
    stories_gallery: StoriesGallery,
    story_highlight: StoryHighlight
  }

  const getComponent = (type) => components[type] || BlogText
</script>

<style scoped>
  .landing-content {
    display: grid;
    gap: var(--v-unit-6);
    max-width: 1000px;
    margin: 0 auto;
    width: 100%;
    padding: 0 var(--v-unit-4);
  }

  @media (max-width: 768px) {
    .landing-content {
      gap: var(--v-unit-5);
      padding: 0 var(--v-unit-3);
    }
  }
</style>

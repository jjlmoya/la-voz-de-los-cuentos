<template>
  <div class="blog-content">
    <component
      v-for="(block, index) in content"
      :key="index"
      :is="getComponent(block.type)"
      :block="block"
      :lang="lang"
    />
  </div>
</template>

<script setup>
  import BlogText from './BlogText.vue'
  import BlogHeading from './BlogHeading.vue'
  import BlogList from './BlogList.vue'
  import BlogTable from './BlogTable.vue'
  import BlogQuote from './BlogQuote.vue'
  import BlogHighlight from './BlogHighlight.vue'
  import BlogBarChart from './BlogBarChart.vue'
  import BlogSteps from './BlogSteps.vue'
  import BlogComparison from './BlogComparison.vue'
  import BlogStats from './BlogStats.vue'
  import StoryRecommendation from './StoryRecommendation.vue'
  import StoryLink from './StoryLink.vue'
  import BlogStoryTable from './BlogStoryTable.vue'

  defineProps({
    content: {
      type: Array,
      required: true
    },
    lang: {
      type: String,
      default: 'es'
    }
  })

  const components = {
    text: BlogText,
    heading: BlogHeading,
    list: BlogList,
    table: BlogTable,
    story_table: BlogStoryTable,
    quote: BlogQuote,
    highlight: BlogHighlight,
    barchart: BlogBarChart,
    steps: BlogSteps,
    comparison: BlogComparison,
    stats: BlogStats,
    story_recommendation: StoryRecommendation
  }

  const getComponent = (type) => components[type] || BlogText
</script>

<style scoped>
  .blog-content {
    display: grid;
    gap: var(--v-unit-6);
  }
</style>

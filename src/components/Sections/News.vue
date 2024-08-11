<template>
  <div class="sections-new">
    <BasicCard
      v-for="story in stories"
      :slug="story.key"
      :key="story.key"
      :title="story.name"
      :time="parseInt(story.time)"
      isStory
    />
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'
  import useStories from '../../composables/useStories'

  const { getLastNStories } = useStories()
  const _stories = getLastNStories(11).reverse()
  const stories = _stories.slice(1, _stories.length)
</script>

<style scoped>
  .sections-new {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>

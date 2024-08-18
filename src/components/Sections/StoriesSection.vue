<template>
  <div class="sections-stories">
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
  defineProps({
    stories: {
      type: Array,
      default: []
    }
  })
</script>

<style scoped>
  .sections-stories {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    grid-gap: var(--v-unit-4);
  }
</style>

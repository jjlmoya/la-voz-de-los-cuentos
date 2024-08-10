<template>
  <div class="sections-related">
    <BasicCard
      v-for="_story in stories"
      :slug="_story.key"
      :key="_story.key"
      :title="_story.name"
      :time="parseInt(story.time)"
      isStory
    />
  </div>
</template>

<script setup>
  import BasicCard from '../Cards/Basic.vue'
  import useStories from '../../composables/useStories'
  const props = defineProps({
    story: {
      default: {},
      type: Object
    }
  })
  const { getRelatedStories } = useStories()
  const stories = getRelatedStories(props.story)
</script>

<style scoped>
  .sections-related {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: var(--v-unit-8);
  }
</style>
